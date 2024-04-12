import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Form = ({ handleSubmit, error, formId, isLoading }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ email, password });
      }}
    >
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
      {isLoading ? <span className='form-spinner'>&#127922;</span> : null}
    </form>
  );
};
