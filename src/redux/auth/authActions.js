import { createAction } from "@reduxjs/toolkit";

const getTheme = createAction("auth/getTheme");

const setError = createAction("auth/setError");
const clearError = createAction("auth/clearError");

const setToken = createAction("auth/setToken");
const unsetToken = createAction("auth/unsetToken");

const setActiveUser = createAction("auth/setActiveUser");

const setIsUserNew = createAction("auth/setIsUserNew");

const authActions = {
  getTheme,
  setError,
  clearError,
  setToken,
  unsetToken,
  setActiveUser,
  setIsUserNew,
};

export default authActions;
