import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../services/routes';
import i18n from '../services/locales';

export const Header = () => {
  const { t } = useTranslation();
  const { totalScore } = useSelector((state) => state.user);
  const handleSelect = (e) => {
    console.log(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

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
            <select name='lang' defaultValue='en' onChange={handleSelect}>
              <option value='en'>{t('header.en')}</option>
              <option value='ru'>{t('header.ru')}</option>
            </select>
          </li>
        </ul>
      </nav>
    </>
  );
};
