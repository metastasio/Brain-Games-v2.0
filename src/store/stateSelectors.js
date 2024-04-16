import { createSelector } from '@reduxjs/toolkit';

const selectUserData = (state) => state.user;
const selectGameData = (state) => state.games;

const selectNextGame = createSelector(selectGameData, (data) =>
  data.todaysGames.filter((game) => game.available && !game.complete),
);

const selectCompleteGames = createSelector(selectGameData, (data) =>
  data.todaysGames.filter((game) => game.complete),
);


export { selectUserData, selectGameData, selectNextGame, selectCompleteGames };
