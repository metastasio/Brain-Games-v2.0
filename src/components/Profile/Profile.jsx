import { getAuth } from 'firebase/auth';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import {
  getNextLevel,
  getUsersLevel,
  getProgressData,
} from '../../services/utils';
import { postImage, signUserOut } from '../../store/userSlice';

export const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [newProfilePic, setNewProfilePic] = useState(false);
  const { email, icon, status } = useSelector((state) => state.user);
  const { todaysGames, totalScore } = useSelector((state) => state.games);
  const level = getUsersLevel(totalScore);
  const nextLevel = getNextLevel(level);
  const [min, max, percents] = getProgressData(totalScore, level);

  const handleChange = (e) => setNewProfilePic(Boolean(e.target.value));

  const handleSubmit = (e) => {
    const auth = getAuth();
    const data = new FormData(e.target);
    e.preventDefault();
    dispatch(
      postImage({ image: data.get('image'), currentUser: auth.currentUser }),
    );
    e.target.reset();
    setNewProfilePic(false);
  };

  const handleClick = () => {
    dispatch(signUserOut());
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
            {t('profile.submitPicture')}
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
          {t('profile.changePicture')}
        </label>
      </form>

      <p className='profile-field-email'>
        {t('profile.email')}:{' '}
        <span className='profile-field-span'>{email}</span>
      </p>

      <div>
        <p className='profile-field-games'>{t('profile.games')}</p>
        <ol className='profile-games-list'>
          {todaysGames.map((game) => (
            <li
              className={game.complete ? 'complete' : 'incomplete'}
              key={game.id}
            >
              <span className='profile-game-name'>
                {t(`games.${game.name}.name`)}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className='profile-progress'>
        <div className='profile-progress-levels'>
          {nextLevel === 'newGrandMaster' ? (
            <p>{t('profile.newGrandMaster')}</p>
          ) : (
            <>
              <p>{t(`profile.${level}`)}</p>
              <p>{t(`profile.${nextLevel}`)}</p>
            </>
          )}
        </div>

        <div className='profile-progress-container'>
          <progress className='profile-bar' value={percents} max={100} />
        </div>

        <div className='profile-progress-points'>
          <p>{min}</p>
          <p>{max}</p>
        </div>
      </div>

      <button className='profile-button-logout' onClick={handleClick}>
        {t('profile.logOut')}
      </button>
      {status === 'loading' ? (
        <span className='profile-form-spinner'>&#127922;</span>
      ) : null}
    </div>
  );
};
