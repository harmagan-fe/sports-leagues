import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League } from '../../models/league.model';

@Component({
  selector: 'app-league-card',
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LeagueCardComponent {
  @Input() league!: League;
  @Input() badgeUrl: string | null = null;
  @Output() cardClick = new EventEmitter<League>();

  onCardClick() {
    this.cardClick.emit(this.league);
  }
}
