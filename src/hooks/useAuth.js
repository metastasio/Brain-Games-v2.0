import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { userAuth } from '../services/firebase';
import { authUser } from '../store/userSlice';
import { getScore } from '../store/gameSlice';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(userAuth, async (user) => {
      if (user) {
        const totalScore = await dispatch(getScore(user.uid)).unwrap();
        dispatch(
          authUser({
            email: user.email,
            uid: user.uid,
            icon: user.photoURL,
            totalScore,
          }),
        );
      }
    });
    return unsub;
  }, [dispatch]);
}
