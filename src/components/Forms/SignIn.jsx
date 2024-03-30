import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './forms.css';
import routes from '../../services/routes';
import { signUserIn } from '../../store/userSlice';

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classNames = cn({
    'form-button': true,
    disabled: status === 'loading',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUserIn({ email, password }))
      .unwrap()
      .then(() => navigate(routes.games()))
      .catch(console.log);
  };

  return (
    <div className='form-wrapper'>
      <form action='' onSubmit={handleSubmit}>
        <h2 className='h3 form-header'>{t('form.signIn')}</h2>

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
          <p role='alert' className='form-errors'>
            {error ? t(`errors.${error}`) : null}
          </p>
        </div>

        <button className={classNames}>{t('form.enter')}</button>
        {status === 'loading' ? (
          <span className='form-spinner'>&#127922;</span>
        ) : null}
      </form>

      <p className='form-hint'>
        {t('form.signedIn')}{' '}
        <Link className='form-register' to={routes.signUpPage()}>
          {t('form.register')}
        </Link>
      </p>
    </div>
  );
};
