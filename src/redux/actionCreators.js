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
export const setFlipCards = newData => ({
  type: actionTypes.REPLACE_FLIP_CARDS,
  newData
})
// export const setIsLoading = newData => ({
//   type: actionTypes.REPLACE_IS_LOADING,
//   newData
// })
