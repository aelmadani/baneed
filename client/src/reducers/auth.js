import * as actionTypes from "../actions/actionTypes";

export default function(state = null, action) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.payload || false; // if empty string => return false
    default:
      return state;
  }
}
