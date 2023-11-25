import { useState } from 'react';

export const useCounter = () => {
  const [state, setState] = useState(0);
  const setCounter = (param) => {
    setState(param);
  };

  return [state, setCounter];
};
