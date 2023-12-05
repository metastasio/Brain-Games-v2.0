import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../services/routes';
import { config } from '../../../services/config';
import { resetCurrentGameScore } from '../../../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';
import './congrats.css';
import { getRandomNumber } from '../../../services/utils';

export const Congrats = ({ name, resetCounter, resetStatus }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn, progress, currentGameScore, todaysGames, alreadyPlayed } =
    useSelector((state) => state.user);

  const getNextGame = () => {
    let randomIndex;
    
    if (signedIn) {
      randomIndex = getRandomNumber(0, 5);
    } else {
      randomIndex = getRandomNumber(0, 3);
    }

    if (alreadyPlayed.includes(todaysGames[randomIndex])) {
      getNextGame();
    }
    return todaysGames[randomIndex];
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
      // navigate(routes.games());
    }
  };

  return (
    <section className='congrats-wrapper'>
      <h2 className='h3 congrats-header'>{t('congrats.header')}</h2>
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
        <button className='next-game' onClick={handleNext}>
          {t('congrats.next')}
        </button>
      </div>
    </section>
  );
};
