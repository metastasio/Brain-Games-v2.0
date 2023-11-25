import { useState } from 'react';

export const useStatus = () => {
  const [state, setState] = useState(null);
  const setStatus = (status) => {
    setState(status);
  };

  return [state, setStatus];
};
