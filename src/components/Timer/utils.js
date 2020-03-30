import {
  setTimePassedAfterStartAction,
  setTimePassedAfterFlipAction,
  setStartTimerAction
} from '../../redux/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import {
  getToGuessImgArray,
  getToRememberImgArray
} from '../../redux/selectors'
import store from '../../redux/store'

let time = 0
// const dispatch = store.dispatch()
// const select = store.getState()
// const toGuessImgArray = select.getToGuessImgArray
// const toRememberImgArray = select.getToRememberImgArray

export const stopTimer = () => {
  console.log('stopTimer')

  clearInterval(time)
}

export const startTimerAfterStart = () => dispatch => {
  console.log('startTimerAfterStart')

  // const dispatch = store.dispatch()

  // await dispatch(stopTimer())
  stopTimer()
  dispatch(setTimePassedAfterStartAction(0))
  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterStartAction(1)), 1000) //BUG after reset time is not logging
  console.log('time', time)

  dispatch(setStartTimerAction(time))
}

export const startTimerAfterFlip = () => dispatch => {
  // dispatch(stopTimer())
  // const dispatch = store.dispatch()

  stopTimer()

  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterFlipAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}

export const saveInfo = (toRememberImgArray, toGuessImgArray) => {
  // const select = store.getState()
  // const toGuessImgArray = select.getToGuessImgArray
  // const toRememberImgArray = select.getToRememberImgArray
  console.log('local run')

  // const { toGuessImgArray, toRememberImgArray } = getState()
  console.log('toguess', toGuessImgArray)
  console.log('toremember', toRememberImgArray)

  const parsed = JSON.stringify(toGuessImgArray)
  localStorage.setItem('toGuessImg', parsed)
  const parsed2 = JSON.stringify(toRememberImgArray)
  localStorage.setItem('toRememberImg', parsed2)
}
