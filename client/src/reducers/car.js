import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cars: [],
  car: null,
  userCars: []
};
export default function(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        cars: action.payload
      };

    case actionTypes.FETCH_CAR:
      return {
        ...state,
        car: action.payload
      };

    case actionTypes.FETCH_USER_CARS:
      return {
        ...state,
        userCars: action.payload
      };

    default:
      return state;
  }
}
