import { useTranslation } from 'react-i18next';

import { config } from '../../../services/config';
import './answersCount.css';

export const AnswersCount = ({ count }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className='conditions'>{t('games.conditions')}</p>
      <p className='count'>
        {t('games.counter')}{' '}
        <strong>
          {count}/{config.winCondition}
        </strong>
      </p>
    </div>
  );
};
