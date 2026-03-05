import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { toggleTheme } from '../features/theme/themeSlice';

export default function ReduxTest() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Redux Test</h2>
      <p>Modo actual: {mode}</p>
      <button onClick={() => dispatch(toggleTheme())}>
        Cambiar tema
      </button>
    </div>
  );
}