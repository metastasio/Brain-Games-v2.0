import {
  get,
  child,
  getDatabase,
  ref as dbRef,
  runTransaction,
} from 'firebase/database';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { database } from '../services/firebase';
import { getRandomGames } from '../services/getRandomGames';
import { authUser, logOut } from './userSlice';

const games = getRandomGames().map((game, i) => ({
  name: game,
  available: i < 4 - 1,
  complete: false,
  id: game,
}));

export const getScore = createAsyncThunk(
  'games/getScore',
  async (uid, { rejectWithValue }) => {
    try {
      const dbReadRef = dbRef(getDatabase());
      const updatedScore = await get(child(dbReadRef, `userScore/${uid}`));

      return updatedScore.toJSON();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const setScore = createAsyncThunk(
  'games/setScore',
  async (uid, { getState }) => {
    const state = getState();
    const scoreRef = dbRef(database, `/userScore/${uid}`);
    const result = await runTransaction(scoreRef, (score) => {
      return score + state.user.currentGameScore;
    });
    const totalScore = result.toJSON();
    return totalScore.snapshot;
  },
);

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    todaysGames: games,
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
        if (game.name === payload && !game.complete) {
          state.totalScore += state.currentGameScore;
          state.progress++;
          game.complete = true;
          return game;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setScore.fulfilled, (state, { payload }) => {
        state.totalScore = payload;
      })
      .addCase(logOut, (state) => {
        state.totalScore = 0;
        state.todaysGames = state.todaysGames.map((game, i) => ({
          name: game.name,
          available: i < 4 - 1,
          complete: false,
          id: game.name,
        }));
      })
      .addCase(authUser, (state, { payload }) => {
        state.totalScore = payload?.totalScore ?? 0;
        state.todaysGames = state.todaysGames.map((game) => {
          game.available = true;
          return game;
        });
      });
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
  resetCurrentGameScore,
} = gameSlice.actions;

export default gameSlice.reducer;
