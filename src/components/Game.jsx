// import { useDispatch } from 'react-redux';
import { useGameValues } from '../hooks';
import { useTranslation } from 'react-i18next';

import { Congrats } from './games/Congrats';
// import {
//   decreaseCurrentScore,
//   increaseCurrentScore,
//   updateTotalScore,
// } from '../store/userSlice';

export const Game = ({ CurrentGame, name }) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

  // const handleClick = (value) => {
  //   if (isCorrect(value, number)) {
  //     dispatch(increaseCurrentScore());
  //     setStatus('success');
  //     setCounter((counter) => counter + 1);
  //     if (counter + 1 === 5) {
  //       dispatch(updateTotalScore({ currentGameScore, name }));
  //     }
  //   } else {
  //     dispatch(decreaseCurrentScore());
  //     setStatus('failed');
  //   }
  //   setNumber();
  // };

  if (counter === 5) {
    return (
      <Congrats
        name={t(`games.${name}.name`)}
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
  return (
    <CurrentGame
      name={name}
      counter={counter}
      setCounter={setCounter}
      status={status}
      setStatus={setStatus}
    />
  );
};
