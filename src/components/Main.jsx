import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import routes from '../services/routes';

export const Main = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section>
        <h2>
          <Trans i18nKey={'main.welcome'}></Trans>
        </h2>
        <p>{t('main.desc')}</p>
        <Link to={routes.games()}>{t('main.start')}</Link>
      </section>
    </main>
  );
};
