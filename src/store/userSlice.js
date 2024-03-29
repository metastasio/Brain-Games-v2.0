import {
  child,
  ref as dbRef,
  get,
  getDatabase,
  runTransaction,
} from 'firebase/database';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { getRandomGames } from '../services/getRandomGames';
import { database, firebaseStorage } from '../services/firebase';

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

export const getScore = createAsyncThunk(
  'user/getScore',
  async (uid, { rejectWithValue }) => {
    try {
      const dbReadRef = dbRef(getDatabase());
      const updatedScore = await get(child(dbReadRef, `userScore/${uid}`));
      return updatedScore.toJSON();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const setScore = createAsyncThunk(
  'user/setScore',
  async (uid, { getState }) => {
    const state = getState();
    const scoreRef = dbRef(database, `/userScore/${uid}`);
    const result = await runTransaction(scoreRef, (score) => {
      return score + state.user.currentGameScore;
    });
    const totalScore = result.toJSON();
    return totalScore.snapshot;
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
        if (game.name === payload && !game.complete) {
          state.totalScore += state.currentGameScore;
          state.progress++;
          game.complete = true;
          return game;
        }
      });
    },
    authUser(state, { payload }) {
      state.status = 'idle';
      state.signedIn = true;
      state.email = payload.email;
      state.userId = payload.uid;
      state.icon = payload?.icon;
      state.error = null;
      state.totalScore = payload?.totalScore;
      state.todaysGames = state.todaysGames.map((game) => {
        game.available = true;
        return game;
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
      .addCase(setScore.fulfilled, (state, { payload }) => {
        state.totalScore = payload;
      })
      .addCase(postImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postImage.fulfilled, (state) => {
        state.status = 'idle';
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
  authUser,
} = userSlice.actions;

export default userSlice.reducer;
