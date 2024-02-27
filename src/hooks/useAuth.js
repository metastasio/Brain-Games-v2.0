import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { userAuth } from '../services/firebase';
import { authUser } from '../store/userSlice';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(userAuth, (user) => {
      setCurrentUser(user);
      dispatch(
        authUser({ email: user.email, uid: user.uid, icon: user.photoURL }),
      );
    });

    return unsub;
  }, [dispatch]);
  return currentUser;
}
