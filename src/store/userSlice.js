import { createSlice } from '@reduxjs/toolkit';

import { getRandomGames } from '../services/getRandomGames';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    alreadyPlayed: [],
    todaysGames: getRandomGames(),
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
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
  resetCurrentGameScore,
} = userSlice.actions;

export default userSlice.reducer;
