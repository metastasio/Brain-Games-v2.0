import { useTranslation } from 'react-i18next';
import { useRandomNumber } from '../../hooks/';

import { isPrime } from '../../services/utils';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Prime = ({ counter, onFailure, onSuccess, status }) => {
  const { t } = useTranslation();

  const [number, setNumber] = useRandomNumber();

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
        <div className='game-expression'>
          <span>{number}</span>
        </div>

        <Buttons handleClick={handleClick} />

        <div className='game-feedback'>
          <Feedback result={status} />
        </div>

        <AnswersCount count={counter} />
      </div>

    </section>
  );
};
