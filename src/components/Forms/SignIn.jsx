import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './forms.css';
import routes from '../../services/routes';

export const SignIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <button className='form-button'>{t('form.enter')}</button>
      </form>
      <Link className='form-register' to={routes.signUpPage()}>
        {t('form.register')}
      </Link>
    </div>
  );
};
