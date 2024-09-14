import { combineReducers } from 'redux'
import counter from './counter'
import checkIn from './checkIn'

export default combineReducers({ counter, checkIn })
