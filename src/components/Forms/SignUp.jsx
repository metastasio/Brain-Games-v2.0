import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './forms.css';
import routes from '../../services/routes';
import { logIn } from '../../store/userSlice';

export const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => navigate(routes.games()))
      .catch(console.log);
  };

  return (
    <div className='form-wrapper'>
      <form action='' onSubmit={handleSubmit}>
        <h2 className='h3 form-header'>{t('form.signUp')}</h2>

        <div className='form-block'>
          <label className='form-label' htmlFor='email'>
            {t('form.email')}
          </label>
          <input
            autoFocus
            className='form-input'
            type='email'
            id='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='form-errors'>{error ? t(`errors.${error}`) : null}</p>
        </div>

        <button className='form-button'>{t('form.register')}</button>
        <div className='form-spinner'></div>
      </form>

      <p className='form-hint'>
        {t('form.signedUp')}{' '}
        <Link className='form-sign-in' to={routes.signInPage()}>
          {t('header.logIn')}
        </Link>
      </p>
    </div>
  );
};
