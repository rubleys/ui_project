import { useQuery } from '@apollo/client/react';
import { GET_EPISODES } from '../../graphql/queries';

export function useEpisodes(page: number, skip: boolean) {
  return useQuery(GET_EPISODES, {
    variables: { page },
    skip,
  });
}