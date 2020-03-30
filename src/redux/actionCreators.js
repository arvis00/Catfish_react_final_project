import * as actionTypes from './actionTypes'

export const setGameModeAction = newData => {
  if (newData === 'random') {
    return {
      type: actionTypes.SET_GAMEMODE_TO_RANDOM,
      newData
    }
  } else if (newData === 'search') {
    return {
      type: actionTypes.SET_GAMEMODE_TO_SEARCH,
      newData
    }
  }
}

export const setDataFetchedAction = newData => ({
  type: actionTypes.REPLACE_DATA_FETCHED,
  newData
})
export const setNumberOfImgAction = newData => ({
  type: actionTypes.REPLACE_NUMBER_OF_IMG,
  newData
})
export const setSearchValueAction = newData => ({
  type: actionTypes.REPLACE_SEARCH_VALUE,
  newData
})
export const setSecondsToRememberAction = newData => ({
  type: actionTypes.REPLACE_SECONDS_TO_REMEMBER,
  newData
})
export const setSizeOfImgAction = newData => ({
  type: actionTypes.REPLACE_SIZE_OF_IMG,
  newData
})
export const setTimePassedAfterFlipAction = newData => ({
  type: actionTypes.REPLACE_TIME_PASSED_AFTER_FLIP,
  newData
})
export const setTimePassedAfterStartAction = newData => ({
  type: actionTypes.REPLACE_TIME_PASSED_AFTER_START,
  newData
})
export const setStartTimerAction = newData => ({
  type: actionTypes.REPLACE_TIMER_INTERVAL,
  newData
})
export const setToGuessImgArrayAction = newData => ({
  type: actionTypes.REPLACE_TO_GUESS_IMG_ARRAY,
  newData
})
export const setToRememberImgArrayAction = newData => ({
  type: actionTypes.REPLACE_TO_REMEMBER_IMG_ARRAY,
  newData
})
export const setTimerEndAction = newData => ({
  type: actionTypes.REPLACE_TIMER_END,
  newData
})
