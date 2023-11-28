import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import { Modal } from '../Modal';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { getExpression, getRandomSign } from '../../services/utils';
import { useRandomNumber } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Calc = ({ counter, setCounter, status, setStatus }) => {
  const dispatch = useDispatch();
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
    <section>
      <Task question='What is the result of the expression?' />
      <div>
        <p>
          {number1} {sign} {number2} = ...
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
