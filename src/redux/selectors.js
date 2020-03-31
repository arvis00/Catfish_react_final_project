export const getNumberOfImg = state => state.gameOptions.numberOfImg
export const getTimePassedAfterStart = state => state.timer.timePassedAfterStart
export const getTimePassedAfterFlip = state => state.timer.timePassedAfterFlip
export const getStartTimer = state => state.timer.startTimer
export const getSizeOfImg = state => state.gameOptions.sizeOfImg
export const getGameMode = state => state.gameOptions.gameMode
export const getSearchValue = state => state.gameOptions.searchValue
export const getToRememberImgArray = state =>
  state.gameOptions.toRememberImgArray
export const getToGuessImgArray = state => state.gameOptions.toGuessImgArray
export const getDataFetched = state => state.gameOptions.dataFetched
export const getSecondsToRemember = state => state.timer.secondsToRemember
export const getTimerEnd = state => state.timer.timerEnd
