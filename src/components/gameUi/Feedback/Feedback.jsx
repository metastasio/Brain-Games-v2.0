import { useTranslation } from 'react-i18next';

import './feedback.css';

export const Feedback = ({ result }) => {
  const { t } = useTranslation();

  if (result === 'success') {
    return (
      <div className='game-feedback'>
        <p className='feedback'>
          {t('games.correct')}{' '}
          <span className='points'>{t('games.correctPoints')}</span>
        </p>
      </div>
    );
  }
  if (result === 'failed') {
    return (
      <div className='game-feedback'>
        <p className='feedback'>
          {t('games.incorrect')}{' '}
          <span className='points'>{t('games.incorrectPoints')}</span>
        </p>
      </div>
    );
  }
};
