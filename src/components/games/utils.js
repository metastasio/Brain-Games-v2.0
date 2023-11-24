const getRandomNumber = (min = 1, max = 10) =>
  Math.floor(Math.random() * (max - min) + min);

export default getRandomNumber;
