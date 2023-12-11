import { useTranslation } from 'react-i18next';

import './signIn.css';

export const SignIn = () => {
  const { t } = useTranslation();

  return (
    <div className='signIn-wrapper'>
      <form action=''>
        <h2 className='h3 form-header'>{t('header.logIn')}</h2>

        <div className='form-block'>
          <label className='form-label' htmlFor='username'>
            {t('form.username')}
          </label>
          <input
            autoFocus
            className='form-input'
            type='text'
            id='username'
            placeholder='Username'
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
    </div>
  );
};
