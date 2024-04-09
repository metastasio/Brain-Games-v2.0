import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './errors.css';

export const Restricted = () => {
  const { t } = useTranslation();

  return (
    <section className='error-wrapper'>
      <p className='error-text'>
        <Link className='reminder-link' to={routes.signInPage()}>
          {t('games.reminderLogIn')}
        </Link>
        {t('games.reminder')}
      </p>
    </section>
  );
};
