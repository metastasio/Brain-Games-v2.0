import { Trans, useTranslation } from 'react-i18next';

export const AnswersCount = ({ count }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('games.conditions')}</p>
      <p>
        <Trans i18nKey='games.counter' values={{ count }} />
      </p>
    </div>
  );
};
