import { ACTION_TYPES } from '../../actions/checkIn'

const wsConnecting = () => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_CONNECTING,
})

const wsConnected = () => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_CONNECTED,
})

const wsDisconnected = () => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_DISCONNECTED,
})

const wsSpotsMessage = (spots) => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_SPOTS_MESSAGE,
  spots,
})

const wsUpdateMessage = (message) => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_UPDATE_MESSAGE,
  message,
})

const wsMiddleware = () => {
  let ws = null

  const handleOpen = (store) => (event) => {
    store.dispatch(wsConnected())
  }

  const handleClose = (store) => (event) => {
    store.dispatch(wsDisconnected())
  }

  const handleMessage = (store) => (event) => {
    const message = JSON.parse(event.data)
    switch (message.type) {
      case 'spots':
        store.dispatch(wsSpotsMessage(message.spots))
        break
      default:
        break
    }
  }

  return (store) => (next) => (action) => {
    switch (action.type) {
      case ACTION_TYPES.CHECK_IN_UPDATES_WS_CONNECT:
        if (ws !== null) {
          ws.close()
          ws = null
        }

        const { protocol: httpProtocol, host } = window.location
        const wsProtocol = httpProtocol === 'https:' ? 'wss:' : 'ws:'
        const url = `${wsProtocol}//${host}/updates`

        ws = new WebSocket(url)

        ws.onopen = handleOpen(store)
        ws.onclose = handleClose(store)
        ws.onmessage = handleMessage(store)
        break

      case ACTION_TYPES.CHECK_IN_UPDATES_WS_DISCONNECT:
        if (ws !== null) {
          ws.close()
          ws = null
        }
        break

      case ACTION_TYPES.CHECK_IN_UPDATES_WS_TOGGLE_SPOT:
        if (ws !== null) {
          ws.send(JSON.stringify({ type: 'toggle-spot', spot: action.spot }))
        }
        break

      // case ACTION_TYPES.CHECK_IN_UPDATES_WS_SEND_MESSAGE:
      //   if (ws !== null) {
      //     ws.send(JSON.stringify(action.message))
      //   }
      //   break

      default:
        return next(action)
    }
  }
}

export default wsMiddleware()
