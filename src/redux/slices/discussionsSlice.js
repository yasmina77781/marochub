import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { discussionsAPI } from '../api';
import { toast } from 'react-toastify';

// Thunks
export const fetchDiscussions = createAsyncThunk(
  'discussions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await discussionsAPI.getAll();
      return response.data;
    } catch (error) {
      toast.error('Erreur lors du chargement des discussions');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createDiscussion = createAsyncThunk(
  'discussions/create',
  async (discussionData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await discussionsAPI.create({
        ...discussionData,
        author: auth.user?.name || 'Anonyme',
        authorEmail: auth.user?.email || '',
        role: auth.user?.role || 'visiteur',
        date: new Date().toISOString().split('T')[0],
        replies: 0,
      });
      toast.success('Discussion créée avec succès!');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de la création de la discussion');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteDiscussion = createAsyncThunk(
  'discussions/delete',
  async (id, { rejectWithValue }) => {
    try {
      await discussionsAPI.delete(id);
      toast.success('Discussion supprimée avec succès!');
      return id;
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice
const discussionsSlice = createSlice({
  name: 'discussions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDiscussions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createDiscussion.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createDiscussion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteDiscussion.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearError } = discussionsSlice.actions;
export default discussionsSlice.reducer;