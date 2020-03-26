import * as actionTypes from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TO_GUESS_IMG_ARRAY:
      return action.newData
    default:
      return state
  }
}
