import authActions from "./authActions";
import { clearToken } from "../../api/asyncStorage/token";
import axios from "axios";
import api_url from "../../api/api_url";

const getTheme = (theme) => (dispatch) => {
  dispatch(authActions.getTheme(theme));
};

const setError = (error) => (dispatch) => {
  dispatch(authActions.setError(error));
};

const clearError = () => (dispatch) => {
  console.log("clearing errd");
  dispatch(authActions.clearError());
};

const setToken = (token) => (dispatch) => {
  dispatch(authActions.setToken(token));
};

const unsetToken = () => (dispatch) => {
  dispatch(authActions.unsetToken());
  clearToken();
};

const getCurrentUser = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .get(`${api_url}/user`, config)
    .then((res) => {
      console.log("res==>", res.data);
      dispatch(authActions.setActiveUser(res.data));
    })
    .catch((err) => console.log("get user error", err));
};

const setIsUserNew = (payload) => (dispatch) => {
  dispatch(authActions.setIsUserNew(payload));
};

const authOperations = {
  getTheme,
  setError,
  setToken,
  clearError,
  unsetToken,
  getCurrentUser,
  setIsUserNew,
};

export default authOperations;
