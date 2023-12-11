import { useDispatch, useSelector } from 'react-redux';
import { useGameValues } from '../hooks';
import { useTranslation } from 'react-i18next';

import { config } from '../services/config';
import { Congrats } from './games/Congrats/Congrats';
import { Restricted } from './Restricted';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
  updateTotalScore,
} from '../store/userSlice';

export const Game = ({ CurrentGame, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentGameScore, todaysGames } = useSelector((state) => state.user);
  const { status, setStatus, counter, setCounter } = useGameValues();
  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

  const onSuccess = () => {
    dispatch(increaseCurrentScore());
    setStatus('success');
    setCounter((counter) => counter + 1);
    if (counter + 1 === config.winCondition) {
      dispatch(updateTotalScore({ currentGameScore, name }));
    }
  };

  const onFailure = () => {
    dispatch(decreaseCurrentScore());
    setStatus('failed');
  };

  const isAvailable = todaysGames.filter(
    (game) => game.name === name && game.available,
  );
  if (!isAvailable.length) {
    return <Restricted />;
  }

  if (counter === config.winCondition) {
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
      counter={counter}
      status={status}
      onFailure={onFailure}
      onSuccess={onSuccess}
    />
  );
};
