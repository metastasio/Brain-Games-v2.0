import { useState } from 'react';

export const useGameValues = () => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('inProgress');

  const setFailedStatus = () => setStatus('failed');
  const setSuccessStatus = () => setStatus('success');
  const setDefaultStatus = () => setStatus('inProgress');
  const setDefaultCounter = () => setCounter(0);
  return {
    status,
    counter,
    setCounter,
    setDefaultStatus,
    setSuccessStatus,
    setFailedStatus,
    setDefaultCounter,
  };
};
