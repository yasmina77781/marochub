import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../api';

// Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.login(email, password);
      if (response.data.length === 0) {
        return rejectWithValue('Email ou mot de passe incorrect');
      }
      const user = response.data[0];
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur de connexion');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await usersAPI.register(userData);
      const user = response.data;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur d\'inscription');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;