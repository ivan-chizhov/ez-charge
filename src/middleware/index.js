import { applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import checkIn from './checkIn'

const isProduction = process.env.NODE_ENV === 'production'
const baseMiddleware = isProduction ? [thunk] : [thunk, createLogger()]
const middleware = [...baseMiddleware, checkIn]
const enhancer = applyMiddleware(...middleware)
export default enhancer
