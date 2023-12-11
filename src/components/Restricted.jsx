import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../services/routes';

export const Restricted = () => {
  const { t } = useTranslation();

  return (
    <p className='reminder'>
      <Link className='reminder-link' to={routes.signInPage()}>
        {t('games.reminderLogIn')}
      </Link>
      {t('games.reminder')}
    </p>
  );
};
