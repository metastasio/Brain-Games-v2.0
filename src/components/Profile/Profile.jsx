import { useDispatch, useSelector } from 'react-redux';

import './profile.css';
import { logOut } from '../../store/userSlice';

export const Profile = () => {
  const dispatch = useDispatch();
  const { userId, email } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className='profile-wrapper'>
      <p>ID: {userId}</p>
      <p>E-mail: {email}</p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};
