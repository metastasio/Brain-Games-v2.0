import { useBlocker } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import { Modal } from '../Modal';
import { isPrime } from '../../services/utils';
import { Task, Feedback, AnswersCount } from './gameUi/';
import { useRandomNumber } from '../../hooks/';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

export const Prime = ({ counter, setStatus, setCounter, status }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useRandomNumber();
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => blocker.proceed();
  const onStay = () => blocker.reset();

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

      {blocker.state === 'blocked'
        ? createPortal(
            <Modal onLeave={onLeave} onStay={onStay} />,
            document.body,
          )
        : null}
    </section>
  );
};
