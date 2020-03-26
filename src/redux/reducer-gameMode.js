import * as actionTypes from './actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_GAMEMODE_TO_RANDOM:
      return `https://api.unsplash.com/photos/random?client_id=KdhCvP8tXfN1Byw49YkwKeDjHe5oa8fpZS2YGgmTYIM&count=${state.numberOfImg}`
    case actionTypes.SET_GAMEMODE_TO_SEARCH:
      return `https://api.unsplash.com/photos/random?client_id=KdhCvP8tXfN1Byw49YkwKeDjHe5oa8fpZS2YGgmTYIM&count=${state.numberOfImg}&query=${state.searchValue}`
    default:
      return state
  }
}
