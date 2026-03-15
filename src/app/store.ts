import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import episodesReducer from '../features/episodes/episodesSlice';
import themeReducer from '../features/theme/themeSlice';
import uiReducer from '../features/ui/uiSlice';

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

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);

export const store = configureStore({
  reducer: {
    episodes: episodesReducer, // No persistido, solo estado temporal
    theme: persistedThemeReducer,
    ui: persistedUiReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;