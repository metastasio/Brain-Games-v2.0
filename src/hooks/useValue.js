import { useState } from 'react';

export const useValue = () => {
  const [state, setState] = useState('');
  const setValue = (value) => {
    setState(value);
  };

  return [state, setValue];
};
