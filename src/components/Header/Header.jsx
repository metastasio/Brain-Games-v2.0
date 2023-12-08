import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import i18n from '../../services/locales';
import './header.css';

export const Header = () => {
  const { t } = useTranslation();
  const { totalScore } = useSelector((state) => state.user);
  const handleSelect = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <nav className='header'>
        <ul>
          <li>
            <h1 className='header-title'>
              <Link to={routes.mainPage()}>
                <span className='header-logo'>&#127922;</span> Brain Games
              </Link>
            </h1>
          </li>
          <li>
            <Link className='games-link' to={routes.games()}>
              {t('header.games')}
            </Link>
          </li>
          <li>
            <Link to={routes.signInPage()}>{t('header.logIn')}</Link>
          </li>
          <li>
            {t('header.profile')}{' '}
            <span className='header-score'>{totalScore}</span>
          </li>
          <li>
            <label className='sr-only' htmlFor='select-language'>
              {t('header.label')}
            </label>
            <select
              id='select-language'
              className='header-select'
              name='lang'
              defaultValue='en'
              onChange={handleSelect}
            >
              <option value='en'>{t('header.en')}</option>
              <option value='ru'>{t('header.ru')}</option>
            </select>
          </li>
        </ul>
      </nav>
    </>
  );
};
