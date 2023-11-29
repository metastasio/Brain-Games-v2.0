import { useGameValues } from '../hooks';
import { useTranslation } from 'react-i18next';

import { Congrats } from './games/Congrats';

export const Game = ({ CurrentGame, name }) => {
  const { t } = useTranslation();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);


  
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
