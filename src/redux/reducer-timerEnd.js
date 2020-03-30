import * as actionTypes from './actionTypes'

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TIMER_END:
      return action.newData
    default:
      return state
  }
}
