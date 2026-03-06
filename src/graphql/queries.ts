import { gql } from "@apollo/client";

// Queries para obtener la lista de episodios y el detalle de un episodio
export const GET_EPISODES = gql`
    query GetEpisodes($page: Int) {
  episodes(page: $page) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      air_date
      episode
      created
    }
  }
}
`;

// Query para obtener el detalle de un episodio, incluyendo sus personajes
export const GET_EPISODE_DETAIL = gql`
  query GetEpisodeDetail($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      created
      characters {
        id
        name
        image
        species
        status
      }
    }
  }
`;
