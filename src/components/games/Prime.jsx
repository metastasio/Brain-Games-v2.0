import { useDispatch } from 'react-redux';

import { useRandomNumber, useGameValues } from '../../hooks/';
import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { isPrime } from '../../services/utils';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

export const Prime = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useRandomNumber();
  const { status, setStatus, counter, setCounter } = useGameValues();

  //   const isCorrect = (answer, num) => {
  //     return isPrime(num) === answer;
  //   };

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus('inprogress');

  const handleClick = (value) => {
    if (isPrime(number) === value) {
      dispatch(increaseCurrentScore());
      setStatus('success');
      setCounter((counter) => counter + 1);
    } else {
      dispatch(decreaseCurrentScore());
      setStatus('failed');
    }
    setNumber();
  };

  if (counter === 5) {
    return (
      <Congrats
        name='Prime Number'
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
  return (
    <section>
      <Task
        question='Answer "yes" if the given number is prime. Otherwise answer "no".'
        hint='A prime number is a natural number greater than 1 which has only two factors, 1 and the number itself'
      />
      <div>
        <p>
          <strong>{number}</strong>
        </p>
        <div>
          <button onClick={() => handleClick(true)}>Yes</button>
          <button onClick={() => handleClick(false)}>No</button>
        </div>
        <Feedback result={status} />
        <AnswersCount count={counter} />
      </div>
    </section>
  );
};
