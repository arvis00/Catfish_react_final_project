import * as actionTypes from './actionTypes'

export const setGameModeAction = newData => ({
  type: actionTypes.SET_GAMEMODE,
  newData
})

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
export const setTimePassedAfterFlipAction = newData => (dispatch, getState) => {
  const { timePassedAfterFlip } = getState()

  let data = newData === 1 ? timePassedAfterFlip + 1 : 0

  return {
    type: actionTypes.REPLACE_TIME_PASSED_AFTER_FLIP,
    newData: data
  }
}
export const setTimePassedAfterStartAction = newData => (
  dispatch,
  getState
) => {
  const { timePassedAfterStart } = getState().timer
  let data = newData === 1 ? timePassedAfterStart + 1 : 0
  console.log('newData', newData)
  console.log('data', data)
  console.log('timePassedAfterStart', timePassedAfterStart)

  return {
    type: actionTypes.REPLACE_TIME_PASSED_AFTER_START,
    newData: data
  }
}
export const setStartTimerAction = newData => ({
  type: actionTypes.REPLACE_START_TIMER,
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
