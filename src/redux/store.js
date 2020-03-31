import { createStore, combineReducers, applyMiddleware } from 'redux'
// import reducerDataFetched from './reducer-dataFetched'
// import reducerGameMode from './reducer-gameMode'
// import reducerNumberOfImg from './reducer-numberOfImg'
// import reducerSearchValue from './reducer-searchValue'
// import reducerSecondsToRemember from './reducer-secondsToRemember'
// import reducerSizeOfImg from './reducer-sizeOfImg'
// import reducerTimePassedAfterFlip from './reducer-timePassedAfterFlip'
// import reducerTimePassedAfterStart from './reducer-timePassedAfterStart'
// import reducerTimerInterval from './reducer-timerInterval'
// import reducerToGuessImgArray from './reducer-toGuessImgArray'
// import reducerToRememberImgArray from './reducer-toRememberImgArray'
// import reducerTimerEnd from './reducer-timerEnd'
import reducerGameOptions from './reducer-gameOptions'
import reducerTimer from './reducer-timer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  timer: reducerTimer,
  gameOptions: reducerGameOptions
  // dataFetched: reducerGameOptions,
  // gameMode: reducerGameOptions,
  // numberOfImg: reducerGameOptions,
  // searchValue: reducerGameOptions,
  // secondsToRemember: reducerTimer,
  // sizeOfImg: reducerGameOptions,
  // timePassedAfterFlip: reducerTimer,
  // timePassedAfterStart: reducerTimer,
  // startTimer: reducerTimer,
  // toGuessImgArray: reducerGameOptions,
  // toRememberImgArray: reducerGameOptions,
  // timerEnd: reducerTimer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
