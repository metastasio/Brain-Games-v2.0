import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './errors.css';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className='error-wrapper'>
      <h2 className='h3'>{t('notFound.title')}</h2>
      <p className='error-text'>
        {t('notFound.text')}{' '}
        <Link to={routes.games()}>{t('notFound.link')}</Link>
      </p>
    </section>
  );
};
