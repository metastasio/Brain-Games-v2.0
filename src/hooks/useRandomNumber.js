import { useState } from 'react';
import { getRandomNumber } from '../services/utils';

export const useRandomNumber = (min = 1, max = 10) => {
  const [state, setState] = useState(() => getRandomNumber());
  const setNewRandomNumber = () => {
    setState(getRandomNumber(min, max));
  };

  return [state, setNewRandomNumber];
};
