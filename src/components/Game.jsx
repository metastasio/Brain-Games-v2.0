import { useGameValues } from '../hooks';
import { Congrats } from './games/Congrats';

export const Game = ({ CurrentGame, name }) => {
  const { status, setStatus, counter, setCounter } = useGameValues();
  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

  if (counter === 5) {
    return (
      <Congrats
        name={name}
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
