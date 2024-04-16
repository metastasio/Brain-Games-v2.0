import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../services/routes';
import { config } from '../../../services/config';
import { Stepper } from '../../Stepper/Stepper';
import { getRandomNumber } from '../../../services/utils';
import { resetCurrentGameScore } from '../../../store/gameSlice';
import { Trans, useTranslation } from 'react-i18next';
import {
  selectGameData,
  selectNextGame,
  selectUserData,
} from '../../../store/stateSelectors';
import './congrats.css';

export const Congrats = ({ name, resetValues }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn } = useSelector(selectUserData);
  const { progress, currentGameScore } = useSelector(selectGameData);

  const currentProgressCap = signedIn ? config.authUser : config.unAuthUser;
  const availableGames = useSelector(selectNextGame);
  const randomIndex = getRandomNumber(0, availableGames.length - 1);
  const nextGame = availableGames[randomIndex]?.name;

  const resetAll = () => {
    resetValues();
    dispatch(resetCurrentGameScore());
  };

  const handleNext = () => {
    resetAll();
    if (progress === currentProgressCap) {
      navigate(routes.complete());
    } else {
      navigate(routes[nextGame]());
    }
  };

  return (
    <section className='congrats-wrapper'>
      <h2 className='h3 congrats-header'>{t('congrats.header')}</h2>

      <Stepper />

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
