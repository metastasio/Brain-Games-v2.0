import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './forms.css';
import routes from '../../services/routes';
import { Form } from './Form';
import { signUserUp } from '../../store/userSlice';
import { selectUserData } from '../../store/stateSelectors';

export const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector(selectUserData);

  const classNames = cn({
    'form-button': true,
    disabled: status === 'loading',
  });

  const handleSubmit = (payload) => {
    dispatch(signUserUp(payload))
      .unwrap()
      .then(() => navigate(routes.games()))
      .catch(console.log);
  };

  return (
    <div className='form-wrapper'>
      <h2 className='h3 form-header'>{t('form.signUp')}</h2>
      <Form
        formId='sign-up'
        handleSubmit={handleSubmit}
        error={error}
        isLoading={status === 'loading'}
      />

      <button form='sign-up' className={classNames}>
        {t('form.register')}
      </button>

      <p className='form-hint'>
        {t('form.signedUp')}{' '}
        <Link className='form-sign-in' to={routes.signInPage()}>
          {t('header.logIn')}
        </Link>
      </p>
    </div>
  );
};
