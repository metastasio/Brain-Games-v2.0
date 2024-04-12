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
import { authUser, logOut, signUserIn } from './userSlice';
import { toggleGames } from '../services/utils';
import { config } from '../services/config';

const games = toggleGames(getRandomGames());

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
  async (_, { getState }) => {
    const state = getState();
    const uid = state.user.userId;
    if (uid) {
      const scoreRef = dbRef(database, `/userScore/${uid}`);
      const result = await runTransaction(scoreRef, (score) => {
        return score + state.games.currentGameScore;
      });
      const totalScore = result.toJSON();
      return totalScore.snapshot;
    }
    return state.games.totalScore + state.games.currentGameScore;
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
    updateTodaysGames(state, { payload }) {
      state.todaysGames.map((game) => {
        if (game.name === payload && !game.complete) {
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
        state.todaysGames = toggleGames(state.todaysGames);
      })
      .addCase(signUserIn.fulfilled, (state, { payload }) => {
        state.totalScore = payload?.totalScore ?? 0;
      })
      .addCase(authUser, (state, { payload }) => {
        state.totalScore = payload?.totalScore ?? 0;
        state.todaysGames = toggleGames(state.todaysGames, config.authUser);
      });
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTodaysGames,
  resetCurrentGameScore,
} = gameSlice.actions;

export default gameSlice.reducer;
