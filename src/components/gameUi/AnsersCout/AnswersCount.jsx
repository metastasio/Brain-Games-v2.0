import { Trans, useTranslation } from 'react-i18next';

import './answersCount.css'

export const AnswersCount = ({ count }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className='conditions'>{t('games.conditions')}</p>
      <p className='count'>
        <Trans i18nKey='games.counter' values={{ count }} />
      </p>
    </div>
  );
};
