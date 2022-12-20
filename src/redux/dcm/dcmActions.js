import { createAction } from "@reduxjs/toolkit";

const setRunning = createAction("dcm/setRunning");
const setPercentage = createAction("dcm/setPercentage");
const setRate = createAction("dcm/setRate");
const setBehavior = createAction("dcm/setBehavior");

const getDcm = createAction("dcm/getDcm");

const clearRunning = createAction("dcm/clearRunning");
const clearOpened = createAction("dcm/clearOpened");

const setError = createAction("dcm/setError");
const clearError = createAction("dcm/clearError");

const setActiveUser = createAction("dcm/setActiveUser");
const clearActiveUser = createAction("dcm/clearActiveUser");

const saveFrequencyAttempt = createAction("dcm/saveFrequencyAttempt");
const setActiveDomain = createAction("dcm/setActiveDomain");

const dcmActions = {
  setRunning,
  setActiveDomain,
  setRate,
  setPercentage,
  setBehavior,
  saveFrequencyAttempt,
  getDcm,
  clearRunning,
  clearOpened,
  setError,
  clearError,
  setActiveUser,
  clearActiveUser,
};

export default dcmActions;
