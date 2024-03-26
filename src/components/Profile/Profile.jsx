import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import { useAuth } from '../../hooks/useAuth';
import { getNextLevel, getUsersLevel } from '../../services/utils';
import { logOut, postImage } from '../../store/userSlice';

export const Profile = () => {
  const { t } = useTranslation();
  const [newProfilePic, setNewProfilePic] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useAuth();
  const { email, todaysGames, totalScore, icon } = useSelector(
    (state) => state.user,
  );
  const level = getUsersLevel(totalScore);
  const nextLevel = getNextLevel(level);
  const playedGames = todaysGames
    .filter((game) => game.complete === true)
    .map((item) => item.name)
    .map((name) => t(`games.${name}.name`))
    .join(', ');

  const handleChange = (e) => setNewProfilePic(Boolean(e.target.value));

  const handleSubmit = (e) => {
    const data = new FormData(e.target);
    e.preventDefault();
    dispatch(postImage({ image: data.get('image'), currentUser }));
    e.target.reset();
    setNewProfilePic(false);
  };

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className='profile-wrapper'>
      {icon ? (
        <img className='profile-icon icon' src={icon} alt='Profile picture' />
      ) : (
        <FontAwesomeIcon
          className='profile-icon'
          icon={faBrain}
          alt="User's avatar default brain"
        />
      )}

      <form onSubmit={handleSubmit}>
        {newProfilePic ? (
          <button className='profile-form-button' type='submit'>
            Submit
          </button>
        ) : null}
        <input
          id='profile-picture'
          type='file'
          className='custom-file-input'
          name='image'
          onChange={handleChange}
        />
        <label className='profile-label' htmlFor='profile-picture'>
          Change profile picture
        </label>
      </form>

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

      <div className='profile-level-progress'>
        <div className='profile-progress'>
          <progress className='profile-bar' value={75} max={100} />
        </div>
        <p>{level}</p>
        <hr />
        <p>{nextLevel}</p>
      </div>

      <button className='profile-button-logout' onClick={handleClick}>
        {t('profile.logOut')}
      </button>
    </div>
  );
};
