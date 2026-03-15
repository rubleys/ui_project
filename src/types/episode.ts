//for Character details
export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
}

//for Episode details
export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters?: Character[]; // Opcional, solo en detalle
}

//for Pagination info
export interface EpisodesInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

//paginated response from list's query
export interface EpisodesResponse {
  info: EpisodesInfo;
  results: Episode[];
}