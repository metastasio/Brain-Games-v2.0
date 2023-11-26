import { useDispatch } from 'react-redux';

import { useRandomNumber, useGameValues } from '../../hooks/';
import Congrats from './Congrats';
import { Task, Feedback, AnswersCount } from './gameUi/';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

const Even = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useRandomNumber();
  const {status, setStatus, counter, setCounter} = useGameValues();

  const isCorrect = (answer, num) => {
    return (num % 2 === 0) === answer;
  };

  const resetCounter = () => setCounter(0);
  const resetStatus = () => setStatus('inprogress');

  const handleClick = (value) => {
    if (isCorrect(value, number)) {
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
        name='Even Number'
        resetCounter={resetCounter}
        resetStatus={resetStatus}
      />
    );
  }
  return (
    <section>
      <Task
        question='Answer "yes" if the number is even, otherwise answer
          "no".'
        hint='Hint: a number is even if it is completely divisible by 2'
      />
      <div>
        <p>
          Is the number <strong>{number}</strong> even?
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
export default Even;
