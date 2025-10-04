import { configureStore } from '@reduxjs/toolkit';
import startupsReducer from './slices/startupsSlice';
import eventsReducer from './slices/eventsSlice';
import discussionsReducer from './slices/discussionsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    startups: startupsReducer,
    events: eventsReducer,
    discussions: discussionsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;