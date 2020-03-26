import * as actionTypes from './actionTypes'

export default (state = '100', action) => {
  switch (action.type) {
    case actionTypes.REPLACE_SIZE_OF_IMG:
      return action.newData
    default:
      return state
  }
}
