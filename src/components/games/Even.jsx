import { useTranslation } from 'react-i18next';

import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Even = ({ counter, status, onNext }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useRandomNumber();
  const isCorrect = (answer, num) => (num % 2 === 0) === answer;

  const handleClick = (value) => {
    onNext(isCorrect(value, number), setNumber);
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.even.task')} hint={t('games.even.hint')} />
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
