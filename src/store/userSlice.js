import { createSlice } from '@reduxjs/toolkit';

import { getRandomGames } from '../services/getRandomGames';

const games = getRandomGames().map((game, i) => {
  if (i > 2) {
    return { name: game, available: false, complete: false };
  }
  return { name: game, available: true, complete: false };
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    alreadyPlayed: [],
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
      if (!state.alreadyPlayed.includes(payload.name)) {
        state.totalScore += state.currentGameScore;
        state.progress++;
        state.alreadyPlayed.push(payload.name);
      }
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
