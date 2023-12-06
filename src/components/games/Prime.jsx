import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useRandomNumber } from '../../hooks/';

import { Modal } from '../Modal';
import { isPrime } from '../../services/utils';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Prime = ({ counter, onFailure, onSuccess, status }) => {
  const { t } = useTranslation();

  const [number, setNumber] = useRandomNumber();
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => blocker.proceed();
  const onStay = () => blocker.reset();

  const handleClick = (value) => {
    if (isPrime(number) === value) {
      onSuccess();
    } else {
      onFailure();
    }
    setNumber();
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.prime.task')} hint={t('games.prime.hint')} />
      <div>
        <div className='expression'>
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
