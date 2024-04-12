import { useTranslation } from 'react-i18next';

import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, Buttons } from '../gameUi';
import './gameWrapper.css';

export const Even = ({ counter, status, onSuccess, onFailure }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useRandomNumber();
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

        <Buttons handleClick={handleClick} />

          <Feedback result={status} />

        <AnswersCount count={counter} />
      </div>
    </section>
  );
};
