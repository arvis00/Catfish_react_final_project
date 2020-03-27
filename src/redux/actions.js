import {
  setTimePassedAfterStartAction,
  setTimePassedAfterFlipAction,
  setStartTimerAction,
  setGameModeAction,
  setSearchValueAction,
  setToRememberImgArrayAction,
  setToGuessImgArrayAction,
  setDataFetchedAction
} from './actionCreators'
import shuffle from 'lodash.shuffle'

let time = 0

export const stopTimer = () => {
  clearInterval(time)
}

export const startTimerAfterStart = () => dispatch => {
  dispatch(stopTimer())
  dispatch(setTimePassedAfterStartAction(0))
  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterStartAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}

export const startTimerAfterFlip = () => dispatch => {
  dispatch(stopTimer())
  dispatch(setTimePassedAfterFlipAction(0))
  time = setInterval(() => dispatch(setTimePassedAfterFlipAction(1)), 1000)
  dispatch(setStartTimerAction(time))
}

export const passGameMode = mode => dispatch => {
  dispatch(setGameModeAction(mode))
}

export const passSearchValue = value => dispatch => {
  dispatch(setSearchValueAction(value))
}

export const saveInfo = () => getState => {
  console.log('local run')

  const { toGuessImgArray, toRememberImgArray } = getState()
  const parsed = JSON.stringify(toGuessImgArray)
  localStorage.setItem('toGuessImg', parsed)
  const parsed2 = JSON.stringify(toRememberImgArray)
  localStorage.setItem('toRememberImg', parsed2)
}

export const fetchImages = data => async (dispatch, getState) => {
  const { gameMode, numberOfImg, toGuessImgArray } = getState()
  try {
    // const { data } = await fetch(gameMode)
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

    console.log('toguessimgarray', toGuessShuffled)

    await dispatch(saveInfo()) // localstorage turned off
    return true
  } catch (error) {
    return false
  }
}
