import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './forms.css';
import routes from '../../services/routes';
import { signUserIn } from '../../store/userSlice';
import { selectUserData } from '../../store/stateSelectors';
import { Form } from './Form';

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector(selectUserData);

  const classNames = cn({
    'form-button': true,
    disabled: status === 'loading',
  });

  const handleSubmit = (payload) => {
    dispatch(signUserIn(payload))
      .unwrap()
      .then(() => navigate(routes.games()))
      .catch(console.log);
  };

  return (
    <div className='form-wrapper'>
      <h2 className='h3 form-header'>{t('form.signIn')}</h2>
      <Form
        formId='sign-in'
        handleSubmit={handleSubmit}
        error={error}
        isLoading={status === 'loading'}
      />

      <button form='sign-in' className={classNames}>
        {t('form.enter')}
      </button>

      <p className='form-hint'>
        {t('form.signedIn')}{' '}
        <Link className='form-register' to={routes.signUpPage()}>
          {t('form.register')}
        </Link>
      </p>
    </div>
  );
};
