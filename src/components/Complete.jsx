import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';

export const Complete = () => {
  const { t } = useTranslation();
  const { totalScore } = useSelector((state) => state.user);

  return (
    <section>
      <h2>{t('congrats.header')}</h2>
      <p>&#127882;</p>
      <p>{t('congrats.complete')}</p>
      <Trans
        i18nKey='congrats.totalsScore'
        values={{ totalScore: totalScore }}
      />
    </section>
  );
};
