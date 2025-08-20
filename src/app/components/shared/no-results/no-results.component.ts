import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NoResultsComponent {
  @Input() message = 'No leagues found matching your criteria.';
}
