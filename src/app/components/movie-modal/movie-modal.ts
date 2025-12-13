import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-modal',
  imports: [],
  templateUrl: './movie-modal.html',
  styleUrl: './movie-modal.css',
})
export class MovieModal {
  @Input() movie: any;
  @Output() close = new EventEmitter();
}
