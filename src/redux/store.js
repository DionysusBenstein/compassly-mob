import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/authReducer';
import dcmReducer from './dcm/dcmReducer';
import chartReducer from '../screens/General/Therapist/Chart2/chartSlice'

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    dcm: dcmReducer,
    chart: chartReducer,
  },
  devTools: true,
  middleware: [logger, thunk],
});

export const persistor = persistStore(store);
