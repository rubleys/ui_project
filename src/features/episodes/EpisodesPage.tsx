import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setEpisodes } from './episodesSlice';
import { useEpisodes } from './useEpisodes';

export default function EpisodesPage() {
  const dispatch = useDispatch();
  const episodes = useSelector((state: RootState) => state.episodes.list);
  const skipQuery = episodes.length > 0; // si ya tenemos episodios, no hacemos la consulta
  const page = 1; // luego lo haremos dinámico

  const { data, loading, error } = useEpisodes(page, skipQuery);
  console.log("DATA:", data);

  useEffect(() => {
    if (episodes.length === 0 && data?.episodes?.results) {
      dispatch(setEpisodes(data.episodes.results));
    }
  }, [data, episodes.length, dispatch]);

  if (loading && episodes.length === 0) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar episodios</p>;

  return (
    <div>
      <h1>Episodios</h1>
      <pre>{JSON.stringify(episodes, null, 2)}</pre>
    </div>
  );
}