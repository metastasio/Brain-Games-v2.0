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
          return (game.complete = true);
        }
      });
    },
    setTodaysGames(state, { payload }) {
      state.todaysGames = payload;
    },
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
  resetCurrentGameScore,
  setTodaysGames,
} = userSlice.actions;

export default userSlice.reducer;
