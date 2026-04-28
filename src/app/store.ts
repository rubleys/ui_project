import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import episodesReducer from '../features/episodes/episodesSlice';
import themeReducer from '../features/theme/themeSlice';
import uiReducer from '../features/ui/uiSlice';
import authReducer from '../features/auth/authSlice';

//to handle persitence of theme mode (light/dark) across sessions, but not transient UI state like the drawer open/close state which should reset on page refresh
const themePersistConfig = {
  key: 'theme',
  storage,
  whitelist: ['mode'], 
};

//to handle persistence of UI preferences (like column visibility and current page), but not transient UI state like the drawer open/close state which should reset on page refresh
const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['showIdColumn', 'currentPage'], 
};

// To persist episodes data across sessions, but not the selected episode ID which is transient UI state that should reset on page refresh
const episodesPersistConfig = {
  key: 'episodes',
  storage,
  whitelist: ['episodes', 'totalPages', 'currentFetchedPage'],
};

// To persist auth state across sessions
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user'],
};


const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);
const persistedEpisodesReducer = persistReducer(episodesPersistConfig, episodesReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    episodes: persistedEpisodesReducer,
    theme: persistedThemeReducer,
    ui: persistedUiReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;