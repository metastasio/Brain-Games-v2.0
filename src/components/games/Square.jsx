import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, AnswerForm } from '../gameUi';
import './gameWrapper.css';

export const Square = ({ counter, status, onNext }) => {
  const { t } = useTranslation();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const correctAnswer = number1 * number2;

  const handleChange = (e) => {
    const value = Number.isNaN(e.target.valueAsNumber)
      ? ''
      : e.target.valueAsNumber;
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(userAnswer === correctAnswer, () => {
      setValue('');
      setNumber1();
      setNumber2();
    });
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.square.task')} />
      <div>
        <div className='game-expression'>
          <span>{t('games.square.length')}:</span>
          <span>{number1},</span>
          <span>{t('games.square.width')}:</span>
          <span>{number2}</span>
        </div>

        <AnswerForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          userAnswer={userAnswer}
        />

        <Feedback result={status} />

        <AnswersCount count={counter} />
      </div>
    </section>
  );
};
