import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import dcmActions from "./dcmActions";

const initialState = {
  attempts: null,
  time: null,
  wrongPercentage: null,
  neutralPercentage: null,
  rightPercentage: null,
  id: null,
  wrongRate: null,
  neutralRate: null,
  rightRate: null,
};

const initialBehavior = null;

const running = createReducer(initialState, {
  [dcmActions.setRunning]: (_, { payload }) => ({
    id: payload.id,
    title: payload.title,
    time: payload.time,
    type: payload.type,
    // attempts: payload.attempts,
    // time: payload.time,
  }),
  [dcmActions.setPercentage]: (_, { payload }) => ({
    wrongPercentage: payload.wrongPercentage,
    neutralPercentage: payload.neutralPercentage,
    rightPercentage: payload.rightPercentage,
  }),
  [dcmActions.setRate]: (_, { payload }) => ({
    wrongRate: payload.wrongRate,
    neutralRate: payload.neutralRate,
    rightRate: payload.rightRate,
  }),
  [dcmActions.clearRunning]: () => {
    return {
      id: null,
      title: null,
      time: null,
    };
  },
});

const behavior = createReducer(initialBehavior, {
  [dcmActions.setBehavior]: (_, { payload }) => ({
    neutral: payload.neutral,
    right: payload.right,
    wrong: payload.wrong,
  }),
});

const opened = createReducer(null, {
  [dcmActions.getDcm]: (_, { payload }) => payload,
  [dcmActions.clearOpened]: () => null,
});

const error = createReducer(null, {
  [dcmActions.setError]: (_, { payload }) => payload,
  [dcmActions.clearError]: () => null,
});

const activeUser = createReducer(
  { client_id: "", name: "", surname: "" },
  {
    [dcmActions.setActiveUser]: (_, { payload }) => payload,
    [dcmActions.clearActiveUser]: () => null,
  }
);

const activeDomain = createReducer(null, {
  [dcmActions.setActiveDomain]: (_, { payload }) => payload,
});

export default combineReducers({
  opened,
  activeDomain,
  running,
  error,
  behavior,
  activeUser,
});
