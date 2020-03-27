import * as actionTypes from './actionTypes'

export const counterInitialState = {
  counter: 0
}

export default (state = counterInitialState, action) => {
  switch (action.type) {
    case actionTypes.REPLACE_TIME_PASSED_AFTER_START:
      return action.newData === 1
        ? { counter: state.counter + 1 }
        : { counter: 0 }
    default:
      return state
  }
}
