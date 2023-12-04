import { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal';
import { AnswerForm } from '../gameUi/AnswerForm';
import { getRandomLine } from '../../services/utils';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount } from '../gameUi';
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

  const handleChange = (e) => setValue(e.target.valueAsNumber);

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
        <div className='expression'>
          {randomLine.map((item, i) =>
            item === correctAnswer ? (
              <span key={i}>..</span>
            ) : (
              <span key={i}>{item}</span>
            ),
          )}
        </div>
        <div>
          <AnswerForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            userAnswer={userAnswer}
          />
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
