import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startupsAPI } from '../api';
import { toast } from 'react-toastify';

// Thunks
export const fetchStartups = createAsyncThunk(
  'startups/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await startupsAPI.getAll();
      return response.data;
    } catch (error) {
      toast.error('Erreur lors du chargement des startups');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createStartup = createAsyncThunk(
  'startups/create',
  async (startupData, { rejectWithValue }) => {
    try {
      const response = await startupsAPI.create({
        ...startupData,
        createdAt: new Date().toISOString().split('T')[0],
      });
      toast.success('Startup créée avec succès!');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de la création de la startup');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateStartup = createAsyncThunk(
  'startups/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await startupsAPI.update(id, data);
      toast.success('Startup mise à jour avec succès!');
      return response.data;
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteStartup = createAsyncThunk(
  'startups/delete',
  async (id, { rejectWithValue }) => {
    try {
      await startupsAPI.delete(id);
      toast.success('Startup supprimée avec succès!');
      return id;
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      return rejectWithValue(error.response?.data);
    }
  }
);

// Slice
const startupsSlice = createSlice({
  name: 'startups',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchTerm: '',
    selectedSector: 'Tous',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStartups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStartups.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStartups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createStartup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStartup.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createStartup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateStartup.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteStartup.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setSelectedSector, clearError } = startupsSlice.actions;

// Selectors
export const selectFilteredStartups = (state) => {
  const { items, searchTerm, selectedSector } = state.startups;
  return items.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'Tous' || startup.sector === selectedSector;
    return matchesSearch && matchesSector;
  });
};

export const selectFeaturedStartup = (state) => {
  return state.startups.items.find(s => s.featured);
};

export default startupsSlice.reducer;