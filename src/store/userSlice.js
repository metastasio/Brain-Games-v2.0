import { createSlice } from '@reduxjs/toolkit';

import { getRandomGames } from '../services/getRandomGames';

const games = getRandomGames().map((game, i) => ({
  name: game,
  available: i < 4 - 1,
  complete: false,
}));

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
    token: null
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
    setUser(state, { payload }) {
      state.signedIn = true;
      state.email = payload.email;
      state.userId = payload.userId;
      state.token = payload.token;
    },
    logOut(state) {
      state.signedIn = false;
      state.email = null;
      state.userId = null;
      state.token = null
    },
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
