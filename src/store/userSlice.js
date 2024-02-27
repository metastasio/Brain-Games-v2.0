import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getRandomGames } from '../services/getRandomGames';
import { firebaseStorage } from '../services/firebase';

const games = getRandomGames().map((game, i) => ({
  name: game,
  available: i < 4 - 1,
  complete: false,
  id: game,
}));

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
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { email: response.user.email, uid: response.user.uid };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const postImage = createAsyncThunk(
  'user/setIcon',
  async (icon, { dispatch }) => {
    const iconRef = ref(firebaseStorage, 'image');
    uploadBytes(iconRef, icon)
      .then((snap) => {
        getDownloadURL(snap.ref).then((url) => {
          dispatch(setIcon(url));
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signedIn: false,
    totalScore: 0,
    currentGameScore: 0,
    progress: 0,
    todaysGames: games,
    email: null,
    userId: null,
    status: 'idle',
    icon: null,
    error: null,
  },
  reducers: {
    increaseCurrentScore(state) {
      state.currentGameScore += 100;
    },
    decreaseCurrentScore(state) {
      state.currentGameScore -= 5;
    },
    resetCurrentGameScore(state) {
      state.currentGameScore = 0;
    },
    updateTotalScore(state, { payload }) {
      state.todaysGames.map((game) => {
        if (game.name === payload.name && !game.complete) {
          state.totalScore += state.currentGameScore;
          state.progress++;
          game.complete = true;
          return game;
        }
      });
    },
    logOut(state) {
      state.signedIn = false;
      state.email = null;
      state.userId = null;
      state.icon = null;
      state.todaysGames = state.todaysGames.map((game, i) => ({
        name: game.name,
        available: i < 4 - 1,
        complete: false,
        id: game.name,
      }));
    },
    setIcon(state, { payload }) {
      state.icon = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUserUp.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.signedIn = true;
        state.email = payload.email;
        state.userId = payload.uid;
        state.error = null;
        state.todaysGames = state.todaysGames.map((game) => {
          game.available = true;
          return game;
        });
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
        state.status = 'idle';
        state.signedIn = true;
        state.email = payload.email;
        state.userId = payload.uid;
        state.error = null;
        state.todaysGames = state.todaysGames.map((game) => {
          game.available = true;
          return game;
        });
      })
      .addCase(signUserIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUserIn.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload;
      });
  },
});
export const {
  increaseCurrentScore,
  decreaseCurrentScore,
  updateTotalScore,
  resetCurrentGameScore,
  setUser,
  logOut,
  setIcon,
} = userSlice.actions;

export default userSlice.reducer;
