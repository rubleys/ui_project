import { useQuery } from '@apollo/client/react';
import { GET_EPISODES } from '../../graphql/queries';
import type { GetEpisodesQuery, GetEpisodesVariables } from '../../types/graphql';

export function useEpisodes(page: number, skip: boolean = false) {
  return useQuery<GetEpisodesQuery, GetEpisodesVariables>(GET_EPISODES, {
    variables: { page },
    skip,
  });
}