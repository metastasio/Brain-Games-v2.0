import { useState } from 'react';

export const useGameValues = () => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('inProgress');

  return { counter, setCounter, status, setStatus };
};
