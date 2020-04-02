import {
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setDataFetchedAction,
  setStartTimerAction
  // setIsLoading
} from './actionCreators'
import shuffle from 'lodash.shuffle'
import * as actionTypes from './actionTypes'

// export const saveInfo = (toRememberImgArray, toGuessImgArray) => {
//   const parsed = JSON.stringify(toGuessImgArray)
//   localStorage.setItem('toGuessImg', parsed)
//   const parsed2 = JSON.stringify(toRememberImgArray)
//   localStorage.setItem('toRememberImg', parsed2)
// }

export const setTimePassedAfterFlipAction = newData => (dispatch, getState) => {
  const { timePassedAfterFlip } = getState().timer

  let data = newData === 1 ? timePassedAfterFlip + 1 : 0

  dispatch({
    type: actionTypes.REPLACE_TIME_PASSED_AFTER_FLIP,
    newData: data
  })
}

export const setTimePassedAfterStartAction = newData => (
  dispatch,
  getState
) => {
  const { timePassedAfterStart } = getState().timer
  let data = newData === 1 ? timePassedAfterStart + 1 : 0
  dispatch({
    type: actionTypes.REPLACE_TIME_PASSED_AFTER_START,
    newData: data
  })
}

export const setSelectionCounterAction = (newData, increment, decrement) => (
  dispatch,
  getState
) => {
  let data
  const { selectionCounter } = getState().gameOptions
  if (increment) {
    data = increment ? selectionCounter + 1 : 0
  }
  if (decrement) {
    data = increment ? selectionCounter - 1 : 0
  }
  if (newData === 0) {
    data = newData
  }
  dispatch({
    type: actionTypes.REPLACE_SELECTION_COUNTER,
    newData: data
  })
}

export const fetchImages = data => (dispatch, getState) => {
  const { numberOfImg } = getState().gameOptions
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

    // saveInfo(toRememberShuffled, toGuessShuffled) // localstorage turned off/on
    // dispatch(setIsLoading(false))
    return true
  } catch (error) {
    // dispatch(setIsLoading(false))
    return false
  }
}

let time = 0

export const stopTimer = () => {
  clearInterval(time)
}

export const startTimerAfterStart = () => dispatch => {
  stopTimer()
  // dispatch(setTimePassedAfterStartAction(0))
  // dispatch(setTimePassedAfterFlipAction(0))
  time = 0
  time = setInterval(() => dispatch(setTimePassedAfterStartAction(1)), 1000)
  dispatch(setStartTimerAction(time))
  console.log('startTimer')
}

export const startTimerAfterFlip = () => dispatch => {
  stopTimer()
  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterFlipAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}
