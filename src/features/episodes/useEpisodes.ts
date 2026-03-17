import { useQuery } from '@apollo/client/react';
import { GET_EPISODES } from '../../graphql/queries';
import type { GetEpisodesQuery, GetEpisodesVariables } from '../../types/graphql';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setEpisodes } from './episodesSlice';
import { useEffect } from 'react';

export function useEpisodes(page: number) {
  const dispatch = useDispatch();
  const storedEpisodes = useSelector((state: RootState) => state.episodes.episodes);
  const storedCurrentPage = useSelector((state: RootState) => state.episodes.currentFetchedPage);
  const storedTotalPages = useSelector((state: RootState) => state.episodes.totalPages);

  // Only fetches if there are no episodes in the store or if the requested page is different from the last fetched page
  const shouldFetch = storedEpisodes.length === 0 || storedCurrentPage !== page;

  const { data, loading, error } = useQuery<GetEpisodesQuery, GetEpisodesVariables>(GET_EPISODES, {
    variables: { page },
    skip: !shouldFetch, 
  });

  // Save in Redux if there's new data from Apollo
  useEffect(() => {
    if (data?.episodes?.results && shouldFetch) {
      dispatch(setEpisodes({
        episodes: data.episodes.results,
        totalPages: data.episodes.info.pages,
        page,
      }));
    }
  }, [data, shouldFetch, dispatch, page]);

  return {
    episodes: storedEpisodes, // Return episodes from Redux
    loading,
    error,
    totalPages: storedTotalPages,
  };
}