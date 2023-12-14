import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import { logOut } from '../../store/userSlice';

export const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, email } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className='profile-wrapper'>
      <p className='profile-field-id'>
        {t('profile.id')}: <span className='profile-field-span'>{userId}</span>
      </p>
      <p className='profile-field-email'>
        {t('profile.email')}:{' '}
        <span className='profile-field-span'>{email}</span>
      </p>
      <p className='profile-field-games'>
        {t('profile.games')}:{' '}
        <span className='profile-field-span'>{email}</span>
      </p>

      <button className='profile-button-logout' onClick={handleClick}>
        {t('profile.logOut')}
      </button>
    </div>
  );
};
