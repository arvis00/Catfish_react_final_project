import * as actionTypes from './actionTypes'
const initialState = {
  toGuessImgArray: [],
  toRememberImgArray: [],
  dataFetched: false,
  gameMode: null,
  numberOfImg: 16,
  searchValue: null,
  sizeOfImg: '100',
  flipCards: false,
  selectionCounter: 0
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TO_GUESS_IMG_ARRAY:
      return { ...state, toGuessImgArray: action.newData }
    case actionTypes.REPLACE_TO_REMEMBER_IMG_ARRAY:
      return { ...state, toRememberImgArray: action.newData }
    case actionTypes.REPLACE_DATA_FETCHED:
      return { ...state, dataFetched: action.newData }
    case actionTypes.SET_GAMEMODE:
      return { ...state, gameMode: action.newData }
    case actionTypes.REPLACE_NUMBER_OF_IMG:
      return { ...state, numberOfImg: action.newData }
    case actionTypes.REPLACE_SEARCH_VALUE:
      return { ...state, searchValue: action.newData }
    case actionTypes.REPLACE_SIZE_OF_IMG:
      return { ...state, sizeOfImg: action.newData }
    case actionTypes.REPLACE_FLIP_CARDS:
      return { ...state, flipCards: action.newData }
    case actionTypes.REPLACE_SELECTION_COUNTER:
      return { ...state, selectionCounter: action.newData }
    default:
      return state
  }
}
