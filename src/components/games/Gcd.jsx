import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { gcd } from '../../services/utils';
import { Modal } from '../Modal';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, AnswerForm } from '../gameUi';
import './gameWrapper.css';

export const Gcd = ({ counter, status, onFailure, onSuccess }) => {
  const { t } = useTranslation();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const correctAnswer = gcd(number1, number2);
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
      onSuccess();
    } else {
      onFailure();
    }
    setValue('');
    setNumber1();
    setNumber2();
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.gcd.task')} />
      <div>
        <div className='game-expression'>
          <span>{number1}</span>
          <span>{number2}</span>
        </div>
        <div className='game-controls'>
          <AnswerForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            userAnswer={userAnswer}
          />
        </div>
        <div className='game-feedback'>
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
