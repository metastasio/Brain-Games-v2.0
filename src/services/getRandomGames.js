import { getRandomNumber } from './utils';

export const getRandomGames = () => {
  const gamesList = [
    'even',
    'calc',
    'progression',
    'gcd',
    'prime',
    'square',
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
