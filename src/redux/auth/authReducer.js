import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./authActions";

const initialTheme = "light";

const initialUserState = {
  id: "",
  avatar: null,
  email: "",
  name: "",
  number: "",
  register_date: "",
  surname: "",
  verify: "",
};

const token = createReducer(null, {
  [authActions.setToken]: (_, { payload }) => payload,
  [authActions.unsetToken]: () => null,
});

const theme = createReducer(initialTheme, {
  [authActions.getTheme]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [authActions.setError]: (_, { payload }) => payload,
  [authActions.clearError]: () => null,
});

const currentUser = createReducer(initialUserState, {
  [authActions.setActiveUser]: (_, { payload }) => payload,
});

const isUserNew = createReducer(false, {
  [authActions.setIsUserNew]: (_, { payload }) => payload,
});

export default combineReducers({
  theme,
  error,
  token,
  currentUser,
  isUserNew,
});
