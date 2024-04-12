import { useTranslation } from 'react-i18next';

import './feedback.css';

export const Feedback = ({ result }) => {
  const { t } = useTranslation();

  return (
    <p className='feedback'>
      {t(`games.${result}.text`)}{' '}
      <span className='points'>{t(`games.${result}.points`)}</span>
    </p>
  );
};
