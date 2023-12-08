import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Even = ({ counter, status, onSuccess, onFailure }) => {
  const { t } = useTranslation();
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
      onSuccess();
    } else {
      onFailure();
    }
    setNumber();
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.even.task')} hint={t('games.even.hint')} />
      <div>
        <div className='game-expression'>
          <span>{number}</span>
        </div>
        <div className='game-controls'>
          <Buttons handleClick={handleClick} />
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
