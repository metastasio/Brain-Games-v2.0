import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './main.css';

export const Main = () => {
  const { t } = useTranslation();

  return (
    <main className='main'>
      <section>
        <h2>
          <Trans i18nKey={'main.welcome'}></Trans>
        </h2>
        <p className='main-description'>{t('main.desc')}</p>
        <div className='main-start'>
          <Link to={routes.games()}>
            {t('main.start')}
          </Link>
        </div>
      </section>
    </main>
  );
};
