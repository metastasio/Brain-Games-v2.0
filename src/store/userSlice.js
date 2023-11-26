import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    a: '',
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
      state.currentGameScore = 0;
      state.totalScore += payload;
      state.progress++;
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
