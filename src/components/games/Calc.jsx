import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { getExpression, getRandomSign } from '../../services/utils';
import { useValue, useStatus, useRandomNumber, useCounter } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Calc = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useStatus();
  const [counter, setCounter] = useCounter();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [value, setValue] = useValue();
  const [sign, setSign] = useState(() => getRandomSign());

  const correctAnswer = getExpression(number1, number2, sign);

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

  const isCorrect = (userAnswer, correctAnswer) => {
    return userAnswer === correctAnswer;
  };

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userAnswer = data.get('result');

    if (isCorrect(Number(userAnswer), correctAnswer)) {
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
      <div>
        <Task question='What is the result of the expression?' />
      </div>
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
