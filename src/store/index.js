import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import gameReducer from './gameSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    games: gameReducer
  },
});
