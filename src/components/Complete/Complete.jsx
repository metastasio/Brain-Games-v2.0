import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './complete.css';

export const Complete = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { totalScore, progress } = useSelector((state) => state.user);

  return progress === 3 ? (
    <section className='complete-wrapper'>
      <h2 className='h3 complete-header'>{t('congrats.header')}</h2>
      <p className='complete-emoji'>&#127882;</p>
      <p className='complete-text'>{t('congrats.complete')}</p>
      <p className='complete-points'>
        {t('congrats.totalsScore')} <strong>{totalScore}</strong>
        {t('congrats.totalsScore2')}
      </p>

      <Link autoFocus className='play-again' to={routes.games()}>
        {t('congrats.again')}
      </Link>
    </section>
  ) : (
    navigate(routes.mainPage())
  );
};
