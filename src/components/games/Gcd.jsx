import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { gcd } from '../../services/utils';
import { Congrats } from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { useRandomNumber, useGameValues } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Gcd = () => {
  const dispatch = useDispatch();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');

  const correctAnswer = gcd(number1, number2);

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus('inprogress');

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
  };

  if (counter === 5) {
    return (
      <Congrats
        name='Greatest Divisor'
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
  return (
    <section>
      <Task question='Find the greatest common divisor for the given numbers.' />
      <div>
        <p>
          <button>{number1}</button> <button>{number2}</button>
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
    </section>
  );
};
