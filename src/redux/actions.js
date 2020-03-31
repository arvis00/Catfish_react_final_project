import {
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setDataFetchedAction,
  setTimePassedAfterStartAction,
  setTimePassedAfterFlipAction,
  setStartTimerAction
} from './actionCreators'
import shuffle from 'lodash.shuffle'
import { saveInfo } from '../components/Timer/utils'

export const fetchImages = data => (dispatch, getState) => {
  const { numberOfImg } = getState()
  try {
    const splitArray = data.splice(numberOfImg / 2)
    const toRememberShuffled = shuffle([...data, ...data])
    const toGuessShuffled = shuffle([...data, ...splitArray]).map(
      storedImage => {
        return {
          ...storedImage,
          hidden: false
        }
      }
    )
    dispatch(setToRememberImgArrayAction(toRememberShuffled))
    dispatch(setToGuessImgArrayAction(toGuessShuffled))
    dispatch(setDataFetchedAction(true))

    saveInfo(toRememberShuffled, toGuessShuffled) // localstorage turned off/on
    return true
  } catch (error) {
    return false
  }
}

let time = 0

export const stopTimer = () => {
  clearInterval(time)
}

export const startTimerAfterStart = () => dispatch => {
  stopTimer()
  dispatch(setTimePassedAfterStartAction(0))
  dispatch(setTimePassedAfterFlipAction(0))
  time = 0
  time = setInterval(() => dispatch(setTimePassedAfterStartAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}

export const startTimerAfterFlip = () => dispatch => {
  stopTimer()
  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterFlipAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}
