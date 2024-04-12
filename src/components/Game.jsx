import { useEffect } from 'react';
import { useGameValues } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { config } from '../services/config';
import { Congrats } from './games/Congrats/Congrats';
import { Restricted } from './Errors/Restricted';
import { selectGameData, selectUserData } from '../store/stateSelectors';
import {
  setScore,
  decreaseCurrentScore,
  increaseCurrentScore,
  resetCurrentGameScore,
  updateTodaysGames,
} from '../store/gameSlice';

export const Game = ({ CurrentGame, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUserData);
  const { todaysGames } = useSelector(selectGameData);
  const { status, setStatus, counter, setCounter } = useGameValues();
  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus('inProgress');

  useEffect(() => {
    dispatch(resetCurrentGameScore());
  }, [dispatch]);

  const onSuccess = () => {
    dispatch(increaseCurrentScore());
    setStatus('success');
    setCounter((counter) => counter + 1);
    if (counter + 1 === config.winCondition) {
      dispatch(updateTodaysGames(name));
      dispatch(setScore(userId));
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
