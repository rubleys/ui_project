import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer'; // si lo usas
import episodesReducer from '../features/episodes/episodesSlice';
import themeReducer from '../features/theme/themeSlice';

//para persistencia en localStorage
function loadState() {
  try {
    const serialized = localStorage.getItem('reduxState');
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    episodes: episodesReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const serialized = JSON.stringify(store.getState());
    localStorage.setItem('reduxState', serialized);
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;