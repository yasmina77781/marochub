import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth Slice Simple
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Startups Slice Simple
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
    setStartups: (state, action) => {
      state.items = action.payload;
    },
    addStartup: (state, action) => {
      state.items.push(action.payload);
    },
    removeStartup: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSector: (state, action) => {
      state.selectedSector = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Events Slice Simple
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEvents: (state, action) => {
      state.items = action.payload;
    },
    addEvent: (state, action) => {
      state.items.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeEvent: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Discussions Slice Simple
const discussionsSlice = createSlice({
  name: 'discussions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDiscussions: (state, action) => {
      state.items = action.payload;
    },
    addDiscussion: (state, action) => {
      state.items.unshift(action.payload);
    },
    removeDiscussion: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export actions
export const { setUser, logout, clearError } = authSlice.actions;
export const { 
  setStartups, 
  addStartup, 
  removeStartup, 
  setSearchTerm, 
  setSelectedSector,
  setLoading: setStartupsLoading 
} = startupsSlice.actions;
export const { 
  setEvents, 
  addEvent, 
  updateEvent, 
  removeEvent,
  setLoading: setEventsLoading 
} = eventsSlice.actions;
export const { 
  setDiscussions, 
  addDiscussion, 
  removeDiscussion,
  setLoading: setDiscussionsLoading 
} = discussionsSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    startups: startupsSlice.reducer,
    events: eventsSlice.reducer,
    discussions: discussionsSlice.reducer,
  },
});

export default store;