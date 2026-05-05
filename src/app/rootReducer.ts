import  themeReducer from '../features/theme/themeSlice';
import  uiReducer  from '../features/ui/uiSlice';
import  episodesReducer from '../features/episodes/episodesSlice';
import authReducer from '../features/auth/authSlice';

export const rootReducer = {
  theme: themeReducer,
  ui: uiReducer,
  episodes: episodesReducer,
  auth: authReducer,
};