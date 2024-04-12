import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getRandomLine } from '../../services/utils';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, AnswerForm } from '../gameUi';
import './gameWrapper.css';

export const Progression = ({ counter, status, onSuccess, onFailure }) => {
  const { t } = useTranslation();
  const [number, setNumber] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const [randomLine, setRandomLine] = useState(() => getRandomLine());
  const correctAnswer = randomLine[number - 1];

  const handleChange = (e) => {
    const value = Number.isNaN(e.target.valueAsNumber)
      ? ''
      : e.target.valueAsNumber;
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === correctAnswer) {
      onSuccess();
    } else {
      onFailure();
    }
    setValue('');
    setNumber();
    setRandomLine(() => getRandomLine());
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.progression.task')} />
      <div>
        <div className='game-expression'>
          {randomLine.map((item) => (
            <span key={item}>{item === correctAnswer ? '..' : item} </span>
          ))}
        </div>

        <AnswerForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          userAnswer={userAnswer}
        />

        <div className='game-feedback'>
          <Feedback result={status} />
        </div>

        <AnswersCount count={counter} />
      </div>

    </section>
  );
};
