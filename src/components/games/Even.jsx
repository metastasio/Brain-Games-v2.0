import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../Modal';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount } from '../gameUi';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
} from '../../store/userSlice';
import './gameWrapper.css';

export const Even = ({ counter, status, setCounter, setStatus, name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentGameScore } = useSelector((state) => state.user);
  const [number, setNumber] = useRandomNumber();
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => blocker.proceed();
  const onStay = () => blocker.reset();
  const isCorrect = (answer, num) => {
    return (num % 2 === 0) === answer;
  };

  const handleClick = (value) => {
    if (isCorrect(value, number)) {
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
    setNumber();
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.even.task')} hint={t('games.even.hint')} />
      <div>
        <p className='expression'>{number}</p>
        <div>
          <button onClick={() => handleClick(true)}>{t('games.yes')}</button>
          <button onClick={() => handleClick(false)}>{t('games.no')}</button>
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
