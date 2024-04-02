import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { getScore } from './gameSlice';
import { firebaseStorage } from '../services/firebase';

export const signUserUp = createAsyncThunk(
  'user/signUserUp',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const signUserIn = createAsyncThunk(
  'user/getUser',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      const totalScore = await dispatch(getScore(response.user.uid)).unwrap();

      return {
        email: response.user.email,
        uid: response.user.uid,
        icon: response.user.photoURL,
        totalScore,
      };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const signUserOut = createAsyncThunk(
  'user/logUserOut',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(logOut());
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const postImage = createAsyncThunk(
  'user/setIcon',
  async ({ image, currentUser }, { dispatch }) => {
    const iconRef = ref(firebaseStorage, 'image');
    const snap = await uploadBytes(iconRef, image);
    const url = await getDownloadURL(snap.ref);
    updateProfile(currentUser, { photoURL: url });
    dispatch(setIcon(url));
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    email: null,
    userId: null,
    status: 'idle',
    icon: null,
    error: null,
  },
  reducers: {
    authUser(state, { payload }) {
      state.status = 'idle';
      state.signedIn = true;
      state.email = payload.email;
      state.userId = payload.uid;
      state.icon = payload?.icon;
      state.error = null;
    },
    logOut(state) {
      state.signedIn = false;
      state.email = null;
      state.userId = null;
      state.icon = null;
    },
    setIcon(state, { payload }) {
      state.icon = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUserUp.fulfilled, (state, { payload }) => {
        userSlice.caseReducers.authUser(state, { payload });
      })
      .addCase(signUserUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUserUp.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      })
      .addCase(signUserIn.fulfilled, (state, { payload }) => {
        userSlice.caseReducers.authUser(state, { payload });
      })
      .addCase(signUserIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUserIn.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      })
      .addCase(postImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postImage.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});
export const { setUser, logOut, setIcon, authUser } = userSlice.actions;

export default userSlice.reducer;
