import * as actionTypes from './actionTypes'

export default (state = '15', action) => {
  switch (action.type) {
    case actionTypes.REPLACE_SECONDS_TO_REMEMBER:
      return action.newData
    default:
      return state
  }
}
