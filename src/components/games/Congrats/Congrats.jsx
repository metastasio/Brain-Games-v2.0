// import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../services/routes';
import { config } from '../../../services/config';
import { getRandomNumber } from '../../../services/utils';
import { resetCurrentGameScore } from '../../../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';
import './congrats.css';
import { Stepper } from '../../Stepper/Stepper';

export const Congrats = ({ name, resetCounter, resetStatus }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn, progress, currentGameScore, todaysGames } = useSelector(
    (state) => state.user,
  );
  // const completeGames = todaysGames.filter((game) => game.complete);

  // const isComplete = (i) => {
  //   if (signedIn) {
  //     return i <= completeGames.length - 1;
  //   }
  //   if (!signedIn) {
  //     if (completeGames.length !== 3) {
  //       return i <= completeGames.length - 1;
  //     }
  //     return i !== 2 && i !== 3;
  //   }
  // };

  // const classNames = (i) =>
  //   cn({
  //     'progress-span': true,
  //     unavailable: !signedIn && (i === 2 || i === 3),
  //     complete: isComplete(i),
  //   });

  const getNextGame = () => {
    const availableGames = todaysGames.filter(
      (game) => game.available && !game.complete,
    );
    const randomIndex = getRandomNumber(0, availableGames.length - 1);
    return availableGames[randomIndex].name;
  };

  const resetAll = () => {
    resetCounter();
    resetStatus();
    dispatch(resetCurrentGameScore());
  };

  const handleNext = () => {
    resetAll();
    if (
      (signedIn && progress === config.authUser) ||
      (!signedIn && progress === config.unAuthUser)
    ) {
      navigate(routes.complete());
    } else {
      navigate(routes[getNextGame()]());
    }
  };

  // className={classNames(i)}

  return (
    <section className='congrats-wrapper'>
      <h2 className='h3 congrats-header'>{t('congrats.header')}</h2>

      <div className='progress'>
        <Stepper />
      </div>

      <p className='congrats-text'>
        {t('congrats.text')} <strong className='game-name'>{name}</strong>
      </p>
      <p className='congrats-emoji'>&#127881;</p>
      <p className='congrats-points'>
        <Trans
          i18nKey='congrats.points'
          values={{ points: currentGameScore }}
        />
      </p>
      <div className='congrats-buttons'>
        <button autoFocus className='next-game' onClick={handleNext}>
          {t('congrats.next')}
        </button>
      </div>
    </section>
  );
};
