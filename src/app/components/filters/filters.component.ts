import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FiltersComponent {
  @Input() sportTypes: string[] = [];
  @Output() searchChange = new EventEmitter<string>();
  @Output() sportChange = new EventEmitter<string>();

  searchTerm = '';
  selectedSport = '';

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onSportChange() {
    this.sportChange.emit(this.selectedSport);
  }
}
