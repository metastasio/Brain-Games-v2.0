
import getRandomNumber from '../utils.js';

const task = 'Answer "yes" if the number is even, otherwise answer "no".';

const isEven = (question) => question % 2 === 0;

const gameFunction = () => {
  const question = getRandomNumber();
  const correctAnswer = isEven(question) ? 'yes' : 'no';
  return [question, correctAnswer];
};

export default () => {
  runGame(task, gameFunction);
};
