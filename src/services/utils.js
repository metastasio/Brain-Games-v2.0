const getRandomNumber = (min = 1, max = 10) =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomSign = () => {
  const signs = ['+', '-', '*'];
  const i = getRandomNumber(0, 3);
  const operator = signs[i];
  return operator;
};

const getExpression = (number1, number2, sign) => {
  let expression;
  switch (sign) {
    case '+':
      expression = number1 + number2;
      break;
    case '-':
      expression = number1 - number2;
      break;
    case '*':
      expression = number1 * number2;
      break;
    default:
      throw new Error('Unknown operator!');
  }
  return expression;
};

const getRandomLine = () => {
  const number = getRandomNumber();
  let newLine = 0;
  const arr = [];

  for (let i = 0; i < 10; i += 1) {
    newLine += number;
    arr.push(newLine);
  }
  return arr;
};

const gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

const isPrime = (num) => {
  for (let j = 2, k = Math.sqrt(num); j <= k; j += 1) {
    if (num % j === 0) return false;
  }
  return num > 1;
};

const levels = {
  beginner: { min: 0, max: 3000 },
  intermediate: { min: 3000, max: 6000 },
  advanced: { min: 6000, max: 9000 },
  expert: { min: 9000, max: 12000 },
  grandmaster: { min: 12000, max: Infinity },
};

const getUsersLevel = (currentScore) => {
  const levelEntries = Object.entries(levels);
  let lvl = '';

  for (let level of levelEntries) {
    if (currentScore >= level[1].min && currentScore <= level[1].max) {
      lvl = level[0];
    }
  }
  return lvl;
};

const getNextLevel = (currentLvl) => {
  if (currentLvl === 'grandmaster') {
    return 'newGrandMaster';
  }

  const levelNames = Object.keys(levels);
  const nextLevelIndex = levelNames.indexOf(currentLvl) + 1;
  const nextLevel = levelNames[nextLevelIndex];
  return nextLevel;
};

const getProgressData = (currentPoints, currentLvl) => {
  let { min, max } = levels[currentLvl];

  if (currentPoints < 0) {
    min = 0;
  }
  if (currentLvl === 'grandmaster') {
    return [levels.grandmaster.min, currentPoints, 100];
  }

  const maxPoints = max - min;
  const minPoints = currentPoints - min;
  const percent = ((minPoints * 100) / maxPoints).toFixed(2);
  return [min, max, percent];
};

const toggleGames = (games, close = true) =>
  games.map((game, i) => ({
    ...game,
    available: close ? i < 4 - 1 : true,
  }));

export {
  getRandomNumber,
  getRandomSign,
  getExpression,
  getRandomLine,
  gcd,
  isPrime,
  getUsersLevel,
  getNextLevel,
  getProgressData,
  toggleGames,
};
