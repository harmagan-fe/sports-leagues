export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface Season {
  strSeason: string;
  strBadge?: string;
}

export interface ApiResponse {
  leagues: League[];
}

export interface SeasonResponse {
  seasons: Season[];
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
