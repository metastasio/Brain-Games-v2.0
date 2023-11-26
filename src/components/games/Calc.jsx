import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { getExpression, getRandomSign } from '../../services/utils';
import { useValue, useRandomNumber, useGameValues } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Calc = () => {
  const dispatch = useDispatch();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [value, setValue] = useValue();
  const [sign, setSign] = useState(() => getRandomSign());

  const correctAnswer = getExpression(number1, number2, sign);

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus('inprogress');

  const handleChange = (e) => setValue(e.target.valueAsNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = value;

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

  if (counter === 5) {
    return (
      <Congrats
        name='Calculations'
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
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
              value={value}
              onChange={handleChange}
            />
            <button type='submit'>Try</button>
          </form>
        </div>
        <Feedback result={status} />
        <AnswersCount count={counter} />
      </div>
    </section>
  );
};
