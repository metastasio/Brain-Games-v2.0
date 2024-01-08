import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
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
