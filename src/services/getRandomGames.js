import { getRandomNumber } from './utils';

export const getRandomGames = () => {
  const gamesList = [
    'Even numbers',
    'Calculations',
    'Progression',
    'Greatest Divisor',
    'Prime Number',
    'Find the Square',
  ];

  const randomGames = [];

  while (randomGames.length < 5) {
    let randomIndex = getRandomNumber(0, gamesList.length);
    if (!randomGames.includes(gamesList[randomIndex])) {
      randomGames.push(gamesList[randomIndex]);
    }
  }
  return randomGames;
};
