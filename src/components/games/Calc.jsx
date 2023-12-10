import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { useRandomNumber } from '../../hooks';
import { getExpression, getRandomSign } from '../../services/utils';
import { Task, Feedback, AnswersCount, AnswerForm } from '../gameUi';
import './gameWrapper.css';

export const Calc = ({ counter, status, onSuccess, onFailure }) => {
  const { t } = useTranslation();
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const [sign, setSign] = useState(() => getRandomSign());
  const correctAnswer = getExpression(number1, number2, sign);
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      counter !== 0 && currentLocation.pathname !== nextLocation.pathname,
  );

  const onLeave = () => blocker.proceed();
  const onStay = () => blocker.reset();

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
    setNumber1();
    setNumber2();
    setSign(getRandomSign());
  };

  return (
    <section className='game-wrapper'>
      <Task question={t('games.calc.task')} />
      <div>
        <div className='game-expression'>
          <span>{number1}</span>
          <span>{sign}</span>
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
