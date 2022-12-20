import dcmActions from "./dcmActions";

const setRunning = (payload) => (dispatch) => {
  dispatch(dcmActions.setRunning(payload));
};

const setRate = (payload) => (dispatch) => {
  dispatch(dcmActions.setRate(payload));
};

const setPercentage = (payload) => (dispatch) => {
  dispatch(dcmActions.setPercentage(payload));
};

const setBehavior = (payload) => (dispatch) => {
  dispatch(dcmActions.setBehavior(payload));
};

const clearRunning = () => (dispatch) => {
  dispatch(dcmActions.clearRunning());
};

const clearOpened = () => (dispatch) => {
  dispatch(dcmActions.clearOpened());
};

const getDcm = (dcm) => async (dispatch) => {
  dispatch(dcmActions.getDcm(dcm));
};

const setError = (error) => (dispatch) => {
  dispatch(dcmActions.setError(error));
};

const clearError = () => (dispatch) => {
  dispatch(dcmActions.clearError());
};

const setActiveUser = (user) => (dispatch) => {
  dispatch(dcmActions.setActiveUser(user));
};

const clearActiveUser = () => (dispatch) => {
  dispatch(dcmActions.clearActiveUser());
};

const saveFrequencyAttempt = () => (dispatch) => {
  dispatch(dcmActions.saveFrequencyAttempt());
};

const dcmOperations = {
  setRunning,
  setRate,
  setPercentage,
  setBehavior,
  clearOpened,
  clearRunning,
  getDcm,
  setError,
  clearError,
  setActiveUser,
  clearActiveUser,
};

export default dcmOperations;
