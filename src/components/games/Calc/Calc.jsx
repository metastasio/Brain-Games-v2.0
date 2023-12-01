import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../Modal';
import { Task, Feedback, AnswersCount } from '../../gameUi';
import { getExpression, getRandomSign } from '../../../services/utils';
import { useRandomNumber } from '../../../hooks';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
  updateTotalScore,
} from '../../../store/userSlice';
import './calc.css';

export const Calc = ({ counter, setCounter, status, setStatus, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentGameScore } = useSelector((state) => state.user);
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const [sign, setSign] = useState(() => getRandomSign());
  const correctAnswer = getExpression(number1, number2, sign);
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
    setSign(getRandomSign());
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.calc.task')} />
      <div>
        <p className='expression'>
          {number1} {sign} {number2} = ...
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name='result'
              type='number'
              value={userAnswer}
              onChange={handleChange}
              required='required'
            />
            <button type='submit'>{t('games.try')}</button>
          </form>
        </div>
        <div className='feedback'>
          <Feedback result={status} />
        </div>

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
