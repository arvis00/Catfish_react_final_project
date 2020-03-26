import * as actionTypes from './actionTypes'

export default (state = 0, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TIME_PASSED_AFTER_START:
      return action.newData === 1
        ? (state.timePassedAfterStart += 1)
        : (state.timePassedAfterStart = 0)
    default:
      return state
  }
}
