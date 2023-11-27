import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { getRandomLine } from '../../services/utils';
import { useValue, useRandomNumber, useGameValues } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Progression = () => {
  const dispatch = useDispatch();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const [number, setNumber] = useRandomNumber();
  const [userAnswer, setValue] = useValue();
  const [{ correctAnswer, randomLine }, setRandomLine] = useState(() => {
    const randomLine = getRandomLine();
    const correctAnswer = randomLine[number - 1];
    return { correctAnswer, randomLine };
  });

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

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
    setNumber();
    setRandomLine(() => {
      const randomLine = getRandomLine();
      const correctAnswer = randomLine[number - 1];
      return { correctAnswer, randomLine };
    });
  };

  if (counter === 5) {
    return (
      <Congrats
        name='Progression'
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
  return (
    <section>
      <div>
        <Task question='What number is missing in the progression?' />
      </div>
      <div>
        {randomLine.map((item, i) => {
          if (item === correctAnswer) {
            return <button key={i}>..</button>;
          }
          return <button key={i}>{item}</button>;
        })}
        <p>{correctAnswer}</p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name='result'
              type='number'
              value={userAnswer}
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
