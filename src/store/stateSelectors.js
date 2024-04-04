import { createSelector } from '@reduxjs/toolkit';
import { getRandomNumber } from '../services/utils';

const selectUserData = (state) => state.user;
const selectGameData = (state) => state.games;

const selectNextGame = () =>
  createSelector(
    (state) => selectGameData(state),
    (data) => {
      const availableGames = data.todaysGames.filter(
        (game) => game.available && !game.complete,
      );
      const randomIndex = getRandomNumber(0, availableGames.length - 1);
      return availableGames[randomIndex].name;
    },
  );

export { selectUserData, selectGameData, selectNextGame };
