export const ACTION_TYPES = {
  CHECK_IN_UPDATES_WS_CONNECT: 'CHECK_IN_UPDATES_WS_CONNECT',
  CHECK_IN_UPDATES_WS_DISCONNECT: 'CHECK_IN_UPDATES_WS_DISCONNECT',
  CHECK_IN_UPDATES_WS_CONNECTING: 'CHECK_IN_UPDATES_WS_CONNECTING',
  CHECK_IN_UPDATES_WS_CONNECTED: 'CHECK_IN_UPDATES_WS_CONNECTED',
  CHECK_IN_UPDATES_WS_DISCONNECTED: 'CHECK_IN_UPDATES_WS_DISCONNECTED',
  CHECK_IN_UPDATES_WS_TOGGLE_SPOT: 'CHECK_IN_UPDATES_WS_TOGGLE_SPOT',
  CHECK_IN_UPDATES_WS_SPOTS_MESSAGE: 'CHECK_IN_UPDATES_WS_SPOTS_MESSAGE',
  CHECK_IN_UPDATES_WS_UPDATE_MESSAGE: 'CHECK_IN_UPDATES_WS_UPDATE_MESSAGE',
}

export const wsConnect = () => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_CONNECT,
})

export const wsDisconnect = () => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_DISCONNECT,
})

export const wsToggleSpot = (spot) => ({
  type: ACTION_TYPES.CHECK_IN_UPDATES_WS_TOGGLE_SPOT,
  spot,
})
