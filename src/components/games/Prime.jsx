import { useTranslation } from 'react-i18next';
import { useRandomNumber } from '../../hooks/';

import { isPrime } from '../../services/utils';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Prime = ({ counter, onNext, status }) => {
  const { t } = useTranslation();

  const [number, setNumber] = useRandomNumber();

  const handleClick = (value) => {
    onNext(isPrime(number) === value, setNumber);
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.prime.task')} hint={t('games.prime.hint')} />
      <div>
        <div className='game-expression'>
          <span>{number}</span>
        </div>

        <Buttons handleClick={handleClick} />

        <Feedback result={status} />

        <AnswersCount count={counter} />
      </div>
    </section>
  );
};
