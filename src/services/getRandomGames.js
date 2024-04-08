import { getRandomNumber } from './utils';

export const getRandomGames = () => {
  const gamesList = ['even', 'calc', 'progression', 'gcd', 'prime', 'square'];

  const randomGames = [];

  while (randomGames.length < 5) {
    let randomIndex = getRandomNumber(0, gamesList.length);
    let gameNames = randomGames.map(game => game.name);
    console.log(gameNames, 'GAME NAMES');
    if (!gameNames.includes(gamesList[randomIndex])) {
      // randomGames.push(gamesList[randomIndex]);
      randomGames.push({
        name: gamesList[randomIndex],
        available: false,
        complete: false,
        id: gamesList[randomIndex],
      });
    }
  }
  return randomGames;
};
