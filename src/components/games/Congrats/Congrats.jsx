import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../services/routes';
import { config } from '../../../services/config';
import { resetCurrentGameScore } from '../../../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';
import './congrats.css';

export const Congrats = ({ name, resetCounter, resetStatus }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn, progress, currentGameScore } = useSelector(
    (state) => state.user,
  );

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
    }
  };
  const handlePlayAgain = () => {
    resetAll();
  };

  return (
    <section className='congrats-wrapper'>
      <h2 className='h3 congrats-header'>{t('congrats.header')}</h2>
      <p className='congrats-text'>
        <Trans i18nKey='congrats.text' values={{ name }} />
      </p>
      <span className='congrats-emoji'>&#127881;</span>
      <p className='congrats-points'>
        <Trans
          i18nKey='congrats.points'
          values={{ points: currentGameScore }}
        />
      </p>
      <div className='congrats-buttons'>
        <Link to={routes.games()} onClick={handleNext}>
          {t('congrats.next')}
        </Link>

        <Link onClick={handlePlayAgain}>{t('congrats.again')}</Link>
      </div>
    </section>
  );
};
