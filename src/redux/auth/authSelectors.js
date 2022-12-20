const getTheme = (state) => state.auth.theme;

const getError = (state) => state.auth.error;

const getToken = (state) => state.auth.token;

const authSelectors = {
  getTheme,
  getError,
  getToken,
};

export default authSelectors;
