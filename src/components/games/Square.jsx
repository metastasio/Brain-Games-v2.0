import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../Modal';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount } from './gameUi/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
  updateTotalScore,
} from '../../store/userSlice';

export const Square = ({ counter, setStatus, setCounter, status, name }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentGameScore } = useSelector((state) => state.user);
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const correctAnswer = number1 * number2;
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => blocker.proceed();
  const onStay = () => blocker.reset();

  const handleChange = (e) => setValue(e.target.valueAsNumber);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === correctAnswer) {
      dispatch(increaseCurrentScore());
      setStatus('success');
      setCounter((counter) => counter + 1);
      if (counter + 1 === 5) {
        dispatch(updateTotalScore({ currentGameScore, name }));
      }
    } else {
      dispatch(decreaseCurrentScore());
      setStatus('failed');
    }
    setValue('');
    setNumber1();
    setNumber2();
  };

  return (
    <section>
      <Task question={t('games.square.task')} />
      <div>
        <p>
          {t('games.square.length')}: <strong>{number1}</strong>,{' '}
          {t('games.square.width')}: <strong>{number2}</strong>
        </p>
        <p>{correctAnswer}</p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name='result'
              type='number'
              value={userAnswer}
              onChange={handleChange}
              required='required'
            />
            <button type='submit'>Try</button>
          </form>
        </div>
        <Feedback result={status} />
        <AnswersCount count={counter} />
      </div>
      {blocker.state === 'blocked'
        ? createPortal(
            <Modal onLeave={onLeave} onStay={onStay} />,
            document.body,
          )
        : null}
    </section>
  );
};
