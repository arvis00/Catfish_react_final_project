import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducerGameOptions from './reducer-gameOptions'
import reducerTimer from './reducer-timer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  timer: reducerTimer,
  gameOptions: reducerGameOptions
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
