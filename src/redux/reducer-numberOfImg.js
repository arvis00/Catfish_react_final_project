import * as actionTypes from './actionTypes'

export default (state = '30', action) => {
  switch (action.type) {
    case actionTypes.REPLACE_NUMBER_OF_IMG:
      return action.newData
    default:
      return state
  }
}
