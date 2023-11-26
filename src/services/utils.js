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
export { getRandomNumber, getRandomSign, getExpression, getRandomLine };
