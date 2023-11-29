import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../services/routes';

export const Header = () => {
  const { t } = useTranslation();
  const { totalScore } = useSelector((state) => state.user);

  return (
    <>
      <nav>
        <ul>
          <li>
            <h1>
              <Link to={routes.mainPage()}>&#127922; Brain Games</Link>
            </h1>
          </li>
          <li>
            <Link to={routes.games()}>{t('header.games')}</Link>
          </li>
          <li>
            <Link to={routes.signInPage()}>{t('header.logIn')}</Link>
          </li>
          <li>
            {t('header.profile')} {totalScore}
          </li>
          <li>
            <select name='lang'>
              <option value='en' selected>
                {t('header.en')}
              </option>
              <option value='ru'>{t('header.ru')}</option>
            </select>
          </li>
        </ul>
      </nav>
    </>
  );
};
