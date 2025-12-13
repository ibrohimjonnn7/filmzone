import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieModal } from './../../components/movie-modal/movie-modal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, NgIf, MovieCard, MovieModal, HttpClientModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css'],
})
export class MovieListComponent {
  movies = signal<any[]>([]);
  selectedMovie = signal<any | null>(null);
  searchText = signal('');

  constructor(private http: HttpClient) {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get('http://localhost:3000/movies').subscribe({
      next: (data: any) => this.movies.set(data),
      error: () => alert('Ошибка загрузки данных!'),
    });
  }

  get filteredMovies() {
    return computed(() =>
      this.movies().filter((movie) =>
        movie.title.toLowerCase().includes(this.searchText().toLowerCase())
      )
    )();
  }

  openMovie(movie: any) {
    this.selectedMovie.set(movie);
  }

  closeMovie() {
    this.selectedMovie.set(null);
  }
}