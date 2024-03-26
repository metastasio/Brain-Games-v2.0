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

const levels = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
  'grand master',
];

const getUsersLevel = (score) => {
  if (score >= 3000 && score < 6000) {
    return levels[1];
  }
  if (score >= 6000 && score < 9000) {
    return levels[2];
  }
  if (score >= 9000 && score < 15000) {
    return levels[3];
  }
  if (score >= 15000) {
    return levels[4];
  } else {
    return levels[0];
  }
};

const getNextLevel = (currentLevel) => {
  if (currentLevel === 'grand master') {
    return 'Congratulations, you are the Grand Master';
  }

  const currentLevelId = levels.indexOf(currentLevel);
  const nextLevelId = currentLevelId + 1;
  return levels[nextLevelId];
};

export {
  getRandomNumber,
  getRandomSign,
  getExpression,
  getRandomLine,
  gcd,
  isPrime,
  getUsersLevel,
  // levels,
  getNextLevel,
};
