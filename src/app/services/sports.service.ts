import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiResponse, League, SeasonResponse } from '../models/league.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  private http = inject(HttpClient);

  private readonly API_BASE = environment.apiUrl;
  private leagues$: Observable<League[]> | null = null;
  private badgeCache = new Map<string, Observable<string | null>>();

  getLeagues(): Observable<League[]> {
    if (!this.leagues$) {
      this.leagues$ = this.http.get<ApiResponse>(`${this.API_BASE}/all_leagues.php`).pipe(
        map((response) => response.leagues || []),
        shareReplay(1)
      );
    }
    return this.leagues$;
  }

  getSeasonBadge(leagueId: string): Observable<string | null> {
    if (!this.badgeCache.has(leagueId)) {
      const badge$ = this.http
        .get<SeasonResponse>(`${this.API_BASE}/search_all_seasons.php?badge=1&id=${leagueId}`)
        .pipe(
          map((response) => response.seasons?.[0]?.strBadge || null),
          shareReplay(1)
        );
      this.badgeCache.set(leagueId, badge$);
    }
    return this.badgeCache.get(leagueId)!;
  }
}
