import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import currencyReducer from './currencySlice'; // Assuming your reducer is named this
import {combineReducers, Reducer} from 'redux';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer:Reducer = persistReducer(persistConfig, rootReducer);

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: isDevelopmentEnv ? persistedReducer : rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
