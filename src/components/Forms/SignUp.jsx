import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import './forms.css';
import routes from '../../services/routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

export const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user, 'USER');
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            userId: user.uid,
          }),
        );
        navigate(routes.games());
      })
      .catch(console.errror);
  };

  return (
    <div className='form-wrapper'>
      <form action='' onSubmit={handleSubmit}>
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
        </div>

        <button className='form-button'>{t('form.register')}</button>
      </form>
      <Link className='form-sign-in' to={routes.signInPage()}>
        {t('header.logIn')}
      </Link>
    </div>
  );
};
