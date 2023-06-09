export interface movieResult {
  tmdbId: number;
  title: string;
  overview: string;
  seasons: {}[];
  posterURLs: { original: string };
  cast: [];
  countries: [];
  streamingInfo: { us: {} };
  seasonCount: number;
  type: string;
  firstAirYear: string;
  imdbRating: number;
  genres: {}[];
}
