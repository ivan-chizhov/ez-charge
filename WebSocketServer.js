'use strict'

const WebSocket = require('ws')
const BaseServer = require('webpack-dev-server/lib/servers/BaseServer')
const { parse } = require('url')

/** @typedef {import("webpack-dev-server/lib/Server").WebSocketServerConfiguration} WebSocketServerConfiguration */
/** @typedef {import("webpack-dev-server/lib/Server").ClientConnection} ClientConnection */

module.exports = class WebSocketServer extends BaseServer {
  static heartbeatInterval = 1000

  /**
   * @param {import("../Server")} server
   */
  constructor(server) {
    super(server)

    /** @type {import("ws").ServerOptions} */
    const options = {
      .../** @type {WebSocketServerConfiguration} */
      (this.server.options.webSocketServer).options,
      clientTracking: false,
    }
    const isNoServerMode =
      typeof options.port === 'undefined' &&
      typeof options.server === 'undefined'

    if (isNoServerMode) {
      options.noServer = true
    }

    this.implementation = new WebSocket.Server(options)

    this.updatesClients = []
    this.updatesSpots = []
    this.updatesServer = new WebSocket.Server({ noServer: true })

    /** @type {import("http").Server} */
    this.server.server.on(
      'upgrade',
      /**
       * @param {import("http").IncomingMessage} req
       * @param {import("stream").Duplex} sock
       * @param {Buffer} head
       */
      (req, sock, head) => {
        const { pathname, query } = parse(req.url)
        if (pathname === '/ws' && this.implementation.shouldHandle(req)) {
          this.implementation.handleUpgrade(req, sock, head, (connection) => {
            this.implementation.emit('connection', connection, req)
          })
        } else if (
          pathname === '/updates' &&
          this.updatesServer.shouldHandle(req)
        ) {
          this.updatesServer.handleUpgrade(req, sock, head, (connection) => {
            connection.query = query
            this.updatesServer.emit('connection', connection, req)
          })
        }
      }
    )

    this.implementation.on(
      'error',
      /**
       * @param {Error} err
       */
      (err) => {
        this.server.logger.error(err.message)
      }
    )

    this.updatesServer.on(
      'error',
      /**
       * @param {Error} err
       */
      (err) => {
        this.server.logger.error(err.message)
      }
    )

    const interval = setInterval(() => {
      this.clients.forEach(
        /**
         * @param {ClientConnection} client
         */
        (client) => {
          if (client.isAlive === false) {
            client.terminate()

            return
          }

          client.isAlive = false
          client.ping(() => {})
        }
      )
    }, WebSocketServer.heartbeatInterval)

    const keepAliveInterval = setInterval(() => {
      this.updatesClients.forEach(
        /**
         * @param {ClientConnection} client
         */
        (client) => {
          if (client.isAlive === false) {
            client.terminate()

            return
          }

          client.isAlive = false
          client.ping(() => {})
        }
      )
    }, WebSocketServer.heartbeatInterval)

    this.implementation.on(
      'connection',
      /**
       * @param {ClientConnection} client
       */
      (client) => {
        this.clients.push(client)

        client.isAlive = true

        client.on('pong', () => {
          client.isAlive = true
        })

        client.on('close', () => {
          this.clients.splice(this.clients.indexOf(client), 1)
        })

        // TODO: add a test case for this - https://github.com/webpack/webpack-dev-server/issues/5018
        client.on(
          'error',
          /**
           * @param {Error} err
           */
          (err) => {
            this.server.logger.error(err.message)
          }
        )
      }
    )

    this.updatesServer.on(
      'connection',
      /**
       * @param {ClientConnection} client
       */
      (client) => {
        console.log(
          `updatesServer connection from ${client.url}, query: ${client.query}`
        )

        client.send(JSON.stringify({ type: 'spots', spots: this.updatesSpots }))

        this.updatesClients.push(client)

        client.isAlive = true

        client.on('pong', () => {
          client.isAlive = true
        })

        client.on('message', (data) => {
          const message = JSON.parse(data)

          if (message.type === 'toggle-spot') {
            if (this.updatesSpots.includes(message.spot)) {
              this.updatesSpots.splice(
                this.updatesSpots.indexOf(message.spot),
                1
              )
            } else {
              this.updatesSpots.push(message.spot)
            }

            this.updatesClients.forEach(
              /**
               * @param {ClientConnection} client
               */
              (client) => {
                client.send(
                  JSON.stringify({ type: 'spots', spots: this.updatesSpots })
                )
              }
            )
          }
        })

        client.on('close', () => {
          this.updatesClients.splice(this.updatesClients.indexOf(client), 1)
        })

        // TODO: add a test case for this - https://github.com/webpack/webpack-dev-server/issues/5018
        client.on(
          'error',
          /**
           * @param {Error} err
           */
          (err) => {
            this.server.logger.error(err.message)
          }
        )
      }
    )

    this.implementation.on('close', () => {
      clearInterval(interval)
    })

    this.updatesServer.on('close', () => {
      clearInterval(keepAliveInterval)
    })
  }
}
