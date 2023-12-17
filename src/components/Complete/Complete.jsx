import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import routes from '../../services/routes';
import { config } from '../../services/config';
import './complete.css';

export const Complete = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { totalScore, progress, signedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      (!signedIn && progress !== config.unAuthUser) ||
      (signedIn && progress !== config.authUser)
    ) {
      navigate(routes.mainPage());
    }
  }, [navigate, progress, signedIn]);

  return (
    <section className='complete-wrapper'>
      <h2 className='h3 complete-header'>{t('congrats.header')}</h2>

      <p className='complete-emoji'>&#127882;</p>
      <p className='complete-text'>{t('congrats.complete')}</p>
      <p className='complete-points'>
        {t('congrats.totalsScore')} <strong>{totalScore}</strong>
        {t('congrats.totalsScore2')}
      </p>

      <Link className='complete-play-again' to={routes.games()}>
        {t('congrats.again')}
      </Link>
    </section>
  );
};
