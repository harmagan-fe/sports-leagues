import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League } from './models/league.model';
import { SportsService } from './services/sports.service';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { LeagueCardComponent } from './components/league-card/league-card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NoResultsComponent } from './components/shared/no-results/no-results.component';
import { ErrorComponent } from './components/shared/error/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FiltersComponent,
    LeagueCardComponent,
    LoadingComponent,
    ErrorComponent,
    NoResultsComponent,
  ],
  providers: [SportsService],
})
export class AppComponent implements OnInit {
  private sportsService = inject(SportsService);

  leagues: League[] = [];
  filteredLeagues: League[] = [];
  sportTypes: string[] = [];
  isLoading = true;
  error: string | null = null;
  badgeCache = new Map<string, string | null>();
  badgeLoading = new Set<string>();

  private searchTerm = '';
  private selectedSport = '';

  ngOnInit() {
    this.loadLeagues();
  }

  loadLeagues() {
    this.isLoading = true;
    this.error = null;

    this.sportsService.getLeagues().subscribe({
      next: (leagues) => {
        this.leagues = leagues;
        this.filteredLeagues = leagues;
        this.sportTypes = [...new Set(leagues.map((l) => l.strSport))].sort();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load leagues. Please check your connection.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onSearchChange(term: string) {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  onSportChange(sport: string) {
    this.selectedSport = sport;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredLeagues = this.leagues.filter((league) => {
      const matchesSearch =
        !this.searchTerm ||
        league.strLeague.toLowerCase().includes(this.searchTerm) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate.toLowerCase().includes(this.searchTerm));
      const matchesSport = !this.selectedSport || league.strSport === this.selectedSport;
      return matchesSearch && matchesSport;
    });
  }

  onLeagueClick(league: League) {
    // Only fetch if not already cached or loading
    if (!this.badgeCache.has(league.idLeague) && !this.badgeLoading.has(league.idLeague)) {
      this.badgeLoading.add(league.idLeague);

      this.sportsService.getSeasonBadge(league.idLeague).subscribe({
        next: (badgeUrl) => {
          this.badgeCache.set(league.idLeague, badgeUrl);
          this.badgeLoading.delete(league.idLeague);
        },
        error: (err) => {
          console.error('Error loading badge for league:', league.strLeague, err);
          this.badgeCache.set(league.idLeague, null); // Cache the failure to avoid repeated requests
          this.badgeLoading.delete(league.idLeague);
        },
      });
    }
  }

  getBadgeUrl(leagueId: string): string | null {
    return this.badgeCache.get(leagueId) || null;
  }

  isBadgeLoading(leagueId: string): boolean {
    return this.badgeLoading.has(leagueId);
  }

  trackByLeagueId(index: number, league: League) {
    return league.idLeague;
  }
}
