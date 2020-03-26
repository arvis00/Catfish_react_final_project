import * as actionTypes from './actionTypes'

export default (state = 0, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TIME_PASSED_AFTER_FLIP:
      return action.newData === 1
        ? (state.timePassedAfterFlip += 1)
        : (state.timePassedAfterFlip = 0)
    default:
      return state
  }
}
