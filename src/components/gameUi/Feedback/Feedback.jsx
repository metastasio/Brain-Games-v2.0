import { useTranslation } from 'react-i18next';

import './feedback.css';

export const Feedback = ({ result }) => {
  const { t } = useTranslation();

  if (result === 'success') {
    return (
      <p className='feedback'>
        {t('games.correct')} <span className='points'>{t('games.correctPoints')}</span>
      </p>
    );
  }
  if (result === 'failed') {
    return (
      <p className='feedback'>
        {t('games.incorrect')} <span className='points'>{t('games.incorrectPoints')}</span>
      </p>
    );
  }
};
