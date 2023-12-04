import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './complete.css';

export const Complete = () => {
  const { t } = useTranslation();
  const { totalScore } = useSelector((state) => state.user);

  return (
    <section className='complete-wrapper'>
      <h2 className='h3 complete-header'>{t('congrats.header')}</h2>
      <p className='complete-emoji'>&#127882;</p>
      <p className='complete-text'>{t('congrats.complete')}</p>
      <p className='complete-points'>
        {t('congrats.totalsScore')} <strong>{totalScore}</strong>
        {t('congrats.totalsScore2')}
      </p>
    </section>
  );
};
