// import { useState } from 'react';

// export const useCounter = () => {
//   const [state, setState] = useState(0);
//   const setCounter = (param) => {
//     setState(param);
//   };

//   return [state, setCounter];
// };
import { useState } from 'react';

export const useGameValues = () => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('inProgress');

  return { counter, setCounter, status, setStatus };
};
