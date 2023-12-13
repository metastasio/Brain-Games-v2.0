import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { getRandomGames } from '../services/getRandomGames';

const games = getRandomGames().map((game, i) => ({
  name: game,
  available: i < 4 - 1,
  complete: false,
}));

export const logIn = createAsyncThunk(
  'user/logIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    todaysGames: games,
    email: null,
    userId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    increaseCurrentScore(state) {
      state.currentGameScore += 100;
    },
    decreaseCurrentScore(state) {
      state.currentGameScore -= 5;
    },
    resetCurrentGameScore(state) {
      state.currentGameScore = 0;
    },
    updateTotalScore(state, { payload }) {
      state.todaysGames.map((game) => {
        if (game.name === payload.name && !game.complete) {
          state.totalScore += state.currentGameScore;
          state.progress++;
          game.complete = true;
          return game;
        }
      });
    },
    setTodaysGames(state, { payload }) {
      state.todaysGames = payload;
    },
    logOut(state) {
      state.signedIn = false;
      state.email = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.signedIn = true;
        state.email = payload.email;
        state.userId = payload.uid;
        state.todaysGames = state.todaysGames.map((game) => {
          game.available = true;
          return game;
        });
      })
      .addCase(logIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      });
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
  resetCurrentGameScore,
  setTodaysGames,
  setUser,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
