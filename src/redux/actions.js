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

let time = null

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

export const stopTimer = () => {
  clearInterval(time)
}

export const passGameMode = mode => dispatch => {
  dispatch(setGameModeAction(mode))
}

export const passSearchValue = value => dispatch => {
  dispatch(setSearchValueAction(value))
}

export const fetchImages = () => async (dispatch, getState) => {
  const { gameMode, numberOfImg, toGuessImgArray } = getState()
  try {
    const { data } = await fetch(gameMode)
    console.log(data)
    const splitArray = data.splice(numberOfImg / 2)
    dispatch(setToRememberImgArrayAction(shuffle([...data, ...data])))
    dispatch(setToGuessImgArrayAction(shuffle([...data, ...splitArray])))
    dispatch(setDataFetchedAction(true))
    dispatch(
      setToGuessImgArrayAction(
        toGuessImgArray.map(storedImage => {
          return {
            ...storedImage,
            hidden: false
          }
        })
      )
    )
    // dispatch(saveInfo) // localstorage turned off
    return true
  } catch (error) {
    return false
  }
}

export const saveInfo = () => getState => {
  const { toGuessImgArray, toRememberImgArray } = getState()
  const parsed = JSON.stringify(toGuessImgArray)
  localStorage.setItem('toGuessImg', parsed)
  const parsed2 = JSON.stringify(toRememberImgArray)
  localStorage.setItem('toRememberImg', parsed2)
}
