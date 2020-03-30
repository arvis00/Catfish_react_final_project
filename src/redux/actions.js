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
import { saveInfo } from '../components/Timer/utils'

export const passGameMode = mode => dispatch => {
  dispatch(setGameModeAction(mode))
}

export const passSearchValue = value => dispatch => {
  dispatch(setSearchValueAction(value))
}

export const fetchImages = data => (dispatch, getState) => {
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

    saveInfo(toRememberShuffled, toGuessShuffled) // localstorage turned off
    // saveInfo()
    return true
  } catch (error) {
    return false
  }
}
