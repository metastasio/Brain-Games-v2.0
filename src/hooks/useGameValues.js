import { useState } from 'react';

export const useGameValues = () => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('inProgress');

  const setFailedStatus = () => setStatus('failed');
  const setSuccessStatus = () => setStatus('success');
  const setDefaultValues = () => {
    setStatus('inProgress');
    setCounter(0);
  };

  return {
    status,
    counter,
    setCounter,
    setDefaultValues,
    setSuccessStatus,
    setFailedStatus,
  };
};
