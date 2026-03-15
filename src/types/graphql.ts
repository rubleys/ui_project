import type { EpisodesResponse, Episode } from "./episode";

//types for queries' variables
export interface GetEpisodesVariables {
    page?: number;
}

export interface GetEpisodesDetailVariables {
    id: string;
}

//types for queries' responses
export interface GetEpisodesQuery {
    episodes: EpisodesResponse;
}

export interface GetEpisodeDetailQuery {
    episode: Episode;
}