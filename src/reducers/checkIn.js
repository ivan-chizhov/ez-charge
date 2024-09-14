import { ACTION_TYPES } from '../actions/checkIn'

const initialState = { spots: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHECK_IN_UPDATES_WS_SPOTS_MESSAGE:
      return { spots: action.spots }
    default:
      return state
  }
}
