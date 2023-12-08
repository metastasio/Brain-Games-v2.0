import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useBlocker } from 'react-router-dom';

import { Modal } from '../Modal/Modal';
import { useRandomNumber } from '../../hooks/';
import { Task, Feedback, AnswersCount, AnswerForm } from '../gameUi';

export const Square = ({ counter, status, onSuccess, onFailure }) => {
  const { t } = useTranslation();
  // const { todaysGames } = useSelector((state) => state.user);
  // const isAvailable = todaysGames.filter(
  //   (game) => game.name === 'square' && game.available,
  // );
  const [number1, setNumber1] = useRandomNumber();
  const [number2, setNumber2] = useRandomNumber();
  const [userAnswer, setValue] = useState('');
  const correctAnswer = number1 * number2;
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
      <Task question={t('games.square.task')} />
      <div>
        <div className='game-expression'>
          <span>{t('games.square.length')}:</span>
          <span>{number1},</span>
          <span>{t('games.square.width')}:</span>
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
