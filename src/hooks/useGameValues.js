import { useState } from 'react';

export const useGameValues = () => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('inProgress');

  const setFailedStatus = () => setStatus('failed');
  const setSuccessStatus = () => setStatus('success');

  return {
    status,
    counter,
    setStatus,
    setCounter,
    setFailedStatus,
    setSuccessStatus,
  };
};
