import { legacy_createStore as createStore } from 'redux'
import reducer from './reducers'
import enhancer from './middleware'

const store = createStore(reducer, enhancer)

export default store
