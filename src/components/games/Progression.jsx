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
  const [value, setValue] = useValue();
  const [randomLine, setRandomLine] = useState(() => getRandomLine());

  const index = number - 1;
  const correctAnswer = String(randomLine[index]);
  randomLine[index] = '..';
  const incompleteLine = randomLine.join(' ');

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus(0);

  const handleChange = (e) => setValue(e.target.valueAsNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = value;

    if ((userAnswer, correctAnswer)) {
      dispatch(increaseCurrentScore());
      setStatus('success');
      setCounter((counter) => counter + 1);
    } else {
      dispatch(decreaseCurrentScore());
      setStatus('failed');
    }
    setValue('');
    setNumber();
    setRandomLine(getRandomLine());
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
        <p>{incompleteLine}</p>
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
