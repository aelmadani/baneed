import axios from "axios";
import * as actionTypes from "./actionTypes";
import uuid from "uuid";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");

  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: { msg, alertType, id }
  });
  setTimeout(
    () => dispatch({ type: actionTypes.REMOVE_ALERT, payload: id }),
    timeout
  );
};

export const search = (queryString) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/search${queryString}`);
    dispatch({
      type: actionTypes.SEARCH_SUCCESS,
      payload: res.data
    });
    //dispatch(loadUser());
  } catch (err) {
    console.error(err);
  }
};

export const newCar = (formData) => async (dispatch) => {
  // const images=formData.get('images');
  // formData.delete('images');
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`/api/cars`, formData, config);

    dispatch({
      type: actionTypes.NEWCAR_SUCCESS,
      payload: res.data
    });
    //dispatch(loadUser());
  } catch (err) {
    console.error(err);
  }
};

export const getCar = (carId) => async (dispatch) => {
  try {
    const link = `/api/cars/${carId}`;
    console.log("link: " + link);
    const res = await axios.get(`/api/cars/${carId}`);
    dispatch({
      type: actionTypes.FETCH_CAR,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const addToFavList = (carId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`/api/favorites/${carId}`);
    dispatch({
      type: actionTypes.ADD_TO_FAV,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUsersCars = (userId) => async (dispatch) => {
  try {
    // const link = `/api/users/${userId}/cars`;
    // console.log("link: " + link);
    const res = await axios.get(`/api/users/${userId}/cars`);
    dispatch({
      type: actionTypes.FETCH_USER_CARS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
