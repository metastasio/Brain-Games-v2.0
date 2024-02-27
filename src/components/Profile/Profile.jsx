import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import { logOut, postImage } from '../../store/userSlice';
import { useAuth } from '../../hooks/useAuth';

export const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useAuth();
  const { userId, email, todaysGames } = useSelector((state) => state.user);
  const playedGames = todaysGames
    .filter((game) => game.complete === true)
    .map((item) => item.name)
    .map((name) => t(`games.${name}.name`))
    .join(', ');

  const handleSubmit = (e) => {
    const data = new FormData(e.target);
    e.preventDefault();
    dispatch(postImage({ image: data.get('image'), currentUser }));
    e.target.reset();
  };

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
        <span className='profile-field-span'>
          {playedGames ? playedGames : t('games.completed')}
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <input type='file' name='image' />
        <button type='submit'>Change profile picture</button>
      </form>
      <button className='profile-button-logout' onClick={handleClick}>
        {t('profile.logOut')}
      </button>
    </div>
  );
};
