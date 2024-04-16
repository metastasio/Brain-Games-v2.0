import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useGameValues } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from './Modal/Modal';
import { config } from '../services/config';
import { Congrats } from './games/Congrats/Congrats';
import { Restricted } from './Errors/Restricted';
import { selectAvailableGame } from '../store/stateSelectors';
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
  const {
    status,
    counter,
    setCounter,
    setFailedStatus,
    setSuccessStatus,
    setDefaultStatus,
  } = useGameValues();
  const resetCounter = () => setCounter(0);
  const isAvailable = useSelector(selectAvailableGame(name));
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 &&
      counter !== 5 &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => {
    resetCounter();
    dispatch(resetCurrentGameScore());
    blocker.proceed();
  };
  const onStay = () => blocker.reset();

  useEffect(() => {
    dispatch(resetCurrentGameScore());
  }, [dispatch]);

  const onSuccess = () => {
    dispatch(increaseCurrentScore());
    setSuccessStatus();
    setCounter((counter) => counter + 1);
    if (counter + 1 === config.winCondition) {
      dispatch(updateTodaysGames(name));
      dispatch(setScore());
    }
  };

  const onFailure = () => {
    dispatch(decreaseCurrentScore());
    setFailedStatus();
  };

  const handleGoNext = (isCorrect, cleanup) => {
    if (isCorrect) {
      onSuccess();
    } else {
      onFailure();
    }
    cleanup();
  };

  if (!isAvailable.length) {
    return <Restricted />;
  }

  if (counter === config.winCondition) {
    return (
      <Congrats
        name={t(`games.${name}.name`)}
        resetCounter={resetCounter}
        resetStatus={setDefaultStatus}
      />
    );
  }
  return (
    <>
      <CurrentGame counter={counter} status={status} onNext={handleGoNext} />

      {blocker.state === 'blocked'
        ? createPortal(
            <Modal onLeave={onLeave} onStay={onStay} />,
            document.body,
          )
        : null}
    </>
  );
};
