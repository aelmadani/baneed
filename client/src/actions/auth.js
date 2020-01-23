import axios from "axios";
import * as actionTypes from "./actionTypes";
import { setAlert } from "./alert";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");

  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

// export const register = ({ firstName, lastName, email, password }) => async (
//   dispatch
// ) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({ firstName, lastName, email, password });
//   try {
//     const res = await axios.post("/api/register", body, config);
//     dispatch({
//       type: actionTypes.REGISTER_SUCCESS,
//       payload: res.data
//     });
//     //dispatch(fetchUser());
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: actionTypes.REGISTER_FAIL
//     });
//   }
// };

// //Login User
// export const login = (email, password) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({ email, password });
//   try {
//     const res = await axios.post("/api/login", body, config);
//     dispatch({
//       type: actionTypes.LOGIN_SUCCESS,
//       payload: res.data
//     });
//     //dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: actionTypes.LOGIN_FAIL
//     });
//   }
// };

// //Logout /clear Profile
// export const logout = () => async (dispatch) => {
//   await axios.get("/auth/logout");

//   dispatch({
//     type: actionTypes.LOGOUT
//   });
// };

// // Load User
// export const loadUser = () => async (dispatch) => {
//   // if (localStorage.token) {
//   //   setAuthToken(localStorage.token);
//   // }
//   try {
//     const res = await axios.get("/api/auth");
//     dispatch({
//       type: actionTypes.USER_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: actionTypes.AUTH_ERROR
//     });
//   }
// };

// // Register User
// export const register = ({ firstName, lastName, email, password }) => async (
//   dispatch
// ) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({ firstName, lastName, email, password });
//   try {
//     const res = await axios.post("/api/register", body, config);
//     dispatch({
//       type: actionTypes.REGISTER_SUCCESS,
//       payload: res.data
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: actionTypes.REGISTER_FAIL
//     });
//   }
// };

// Login User
// export const login = (email, password) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify({ email, password });
//   try {
//     const res = await axios.post("/api/auth", body, config);
//     dispatch({
//       type: actionTypes.LOGIN_SUCCESS,
//       payload: res.data
//     });
//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: actionTypes.LOGIN_FAIL
//     });
//   }
// };

//Logout /clear Profile
// export const logout = () => (dispatch) => {
//   dispatch({
//     type: actionTypes.LOGOUT
//   });
//   dispatch({
//     type: actionTypes.CLEAR_PROFILE
//   });
// };
