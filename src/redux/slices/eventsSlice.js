import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventsAPI } from '../api';
import { toast } from 'react-toastify';

// Thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getAll();
      return response.data;
    } catch (error) {
      toast.error('Erreur lors du chargement des événements');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await eventsAPI.create({
        ...eventData,
        participants: [],
        createdBy: auth.user?.email || 'anonymous',
        createdAt: new Date().toISOString().split('T')[0],
      });
      toast.success('Événement créé avec succès!');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de la création de l\'événement');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const joinEvent = createAsyncThunk(
  'events/join',
  async (eventId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.user) {
        toast.error('Veuillez vous connecter pour participer');
        return rejectWithValue('Not authenticated');
      }
      const response = await eventsAPI.joinEvent(eventId, auth.user.email);
      toast.success('Vous êtes inscrit à l\'événement!');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de l\'inscription');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const leaveEvent = createAsyncThunk(
  'events/leave',
  async (eventId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await eventsAPI.leaveEvent(eventId, auth.user.email);
      toast.success('Vous vous êtes désinscrit de l\'événement');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de la désinscription');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id, { rejectWithValue }) => {
    try {
      await eventsAPI.delete(id);
      toast.success('Événement supprimé avec succès!');
      return id;
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice
const eventsSlice = createSlice({
  name: 'events',
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
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Join
      .addCase(joinEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Leave
      .addCase(leaveEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearError } = eventsSlice.actions;

// Selectors
export const selectMyEvents = (state) => {
  const userEmail = state.auth.user?.email;
  if (!userEmail) return [];
  return state.events.items.filter(event => 
    event.participants.includes(userEmail)
  );
};

export const selectUpcomingEvents = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.events.items
    .filter(event => event.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default eventsSlice.reducer;