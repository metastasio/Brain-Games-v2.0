import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../Modal';
import { getRandomLine } from '../../services/utils';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount } from '../gameUi';
import {
  decreaseCurrentScore,
  increaseCurrentScore,
  updateTotalScore,
} from '../../store/userSlice';
import './gameWrapper.css';

export const Progression = ({
  counter,
  setStatus,
  setCounter,
  status,
  name,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentGameScore } = useSelector((state) => state.user);
  const [number, setNumber] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const [randomLine, setRandomLine] = useState(() => getRandomLine());
  const correctAnswer = randomLine[number - 1];

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
      if (counter + 1 === 5) {
        dispatch(updateTotalScore({ currentGameScore, name }));
      }
    } else {
      dispatch(decreaseCurrentScore());
      setStatus('failed');
    }
    setValue('');
    setNumber();
    setRandomLine(() => getRandomLine());
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.progression.task')} />
      <div>
        <div className='expression'>
          {randomLine.map((item, i) =>
            item === correctAnswer ? (
              <span key={i}>..</span>
            ) : (
              <span key={i}>{item}</span>
            ),
          )}
        </div>
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
        <div className='feedback'>
          <Feedback result={status} />
        </div>
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
