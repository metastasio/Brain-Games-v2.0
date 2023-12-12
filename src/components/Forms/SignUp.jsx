import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './forms.css';
import routes from '../../services/routes';

export const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className='form-wrapper'>
      <form action=''>
        <h2 className='h3 form-header'>{t('header.logIn')}</h2>

        <div className='form-block'>
          <label className='form-label' htmlFor='email'>
            {t('form.email')}
          </label>
          <input
            autoFocus
            className='form-input'
            type='text'
            id='email'
            placeholder='E-mail'
          />
        </div>

        <div className='form-block'>
          <label className='form-label' htmlFor='password'>
            {t('form.password')}
          </label>
          <input
            className='form-input'
            type='password'
            id='password'
            placeholder='Password'
          />
        </div>

        <button className='form-button'>{t('form.register')}</button>
      </form>
      <Link className='form-sign-in' to={routes.signInPage()}>
        {t('header.logIn')}
      </Link>
    </div>
  );
};
