import { useTranslation } from 'react-i18next';
import { firebaseStorage } from '../services/firebase';
import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import { logOut, setIcon } from '../../store/userSlice';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(null);
  const { userId, email, todaysGames } = useSelector((state) => state.user);
  const playedGames = todaysGames
    .filter((game) => game.complete === true)
    .map((item) => item.name)
    .map((name) => t(`games.${name}.name`))
    .join(', ');

  console.log(playedGames);

  const handleIconChange = (e) => {
    if (e.target.files[0]) {
      setIcon(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const iconRef = ref(firebaseStorage, 'image');
    uploadBytes(iconRef, icon).then(() => {
      getDownloadURL(iconRef)
        .then((url) => {
          dispatch(setIcon(url));
        })
        .catch((error) => {
          console.log(error);
        });
    });
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

      <button className='profile-button-logout' onClick={handleClick}>
        {t('profile.logOut')}
      </button>
      <input type='file' onChange={handleIconChange} />
      <button onClick={handleSubmit}>Change profile picture</button>
    </div>
  );
};
