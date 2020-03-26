import { createStore, combineReducers } from 'redux'
import reducerDataFetched from './reducer-dataFetched'
import reducerGameMode from './reducer-gameMode'
import reducerNumberOfImg from './reducer-numberOfImg'
import reducerSearchValue from './reducer-searchValue'
import reducerSecondsToRemember from './reducer-secondsToRemember'
import reducerSizeOfImg from './reducer-sizeOfImg'
import reducerTimePassedAfterFlip from './reducer-timePassedAfterFlip'
import reducerTimePassedAfterStart from './reducer-timePassedAfterStart'
import reducerTimerInterval from './reducer-timerInterval'
import reducerToGuessImgArray from './reducer-toGuessImgArray'
import reducerToRememberImgArray from './reducer-toRememberImgArray'

const rootReducer = combineReducers({
  dataFetched: reducerDataFetched,
  gameMode: reducerGameMode,
  numberOfImg: reducerNumberOfImg,
  searchValue: reducerSearchValue,
  secondsToRemember: reducerSecondsToRemember,
  sizeOfImg: reducerSizeOfImg,
  timePassedAfterFlip: reducerTimePassedAfterFlip,
  timePassedAfterStart: reducerTimePassedAfterStart,
  startTimer: reducerTimerInterval,
  toGuessImgArray: reducerToGuessImgArray,
  toRememberImgArray: reducerToRememberImgArray
})

const store = createStore(rootReducer)

export default store
