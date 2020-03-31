import * as actionTypes from './actionTypes'
const initialState = {
  secondsToRemember: '15',
  timePassedAfterFlip: 0,
  timePassedAfterStart: 0,
  timerEnd: false,
  startTimer: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_SECONDS_TO_REMEMBER:
      return { ...state, secondsToRemember: action.newData }
    case actionTypes.REPLACE_TIME_PASSED_AFTER_FLIP:
      return { ...state, timePassedAfterFlip: action.newData }
    case actionTypes.REPLACE_TIME_PASSED_AFTER_START:
      return { ...state, timePassedAfterStart: action.newData }
    case actionTypes.REPLACE_TIMER_END:
      return { ...state, timerEnd: action.newData }
    case actionTypes.REPLACE_START_TIMER:
      return { ...state, startTimer: action.newData }
    default:
      return state
  }
}
