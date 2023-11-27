import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBlocker } from 'react-router-dom';

import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { getRandomLine } from '../../services/utils';
import { useRandomNumber, useGameValues } from '../../hooks/';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
} from '../../store/userSlice';

export const Progression = () => {
  const dispatch = useDispatch();
  const { status, setStatus, counter, setCounter } = useGameValues();
  const [number, setNumber] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const [randomLine, setRandomLine] = useState(() => getRandomLine());
  const correctAnswer = randomLine[number - 1];

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

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
    setRandomLine(() => getRandomLine());
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
        {randomLine.map((item, i) =>
          item === correctAnswer ? (
            <button key={i}>..</button>
          ) : (
            <button key={i}>{item}</button>
          ),
        )}
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

      {blocker.state === 'blocked' ? (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={() => blocker.proceed()}>Proceed</button>
          <button onClick={() => blocker.reset()}>Cancel</button>
        </div>
      ) : null}
    </section>
  );
};
