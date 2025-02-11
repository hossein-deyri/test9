import API from '@/services/httpService';
import { authUtils } from '@/utilize/authUtils';
import { cookiesList } from '@/utilize/cookiesList';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!cookiesList.userToken.get(),
  subInfo: {},
  username: ''
};

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      delete API.defaults.headers.common['Profile-Id'];
      await authUtils.handleLogout();

      return true;
    } catch {
      return rejectWithValue(false);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSubInfo: (state, action) => {
      state.subInfo = action.payload;
    },
    login: (state) => {
      return { ...state, isLoggedIn: true };
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.subInfo = {};
    });
  }
});

const userReducer = userSlice.reducer;

export default userReducer;
export const { login, logOut, setSubInfo, setUsername } = userSlice.actions;
