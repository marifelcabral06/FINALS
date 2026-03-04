import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  APIUrl = "http://localhost:5038/api/movies/";
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshMovies();
  }

  refreshMovies(): void {
    this.http.get<any[]>(this.APIUrl + "GetMovies")
      .subscribe(data => {
        this.movies = data;
      });
  }

  addMovie(): void {

    const title = (document.getElementById("newTitle") as HTMLInputElement).value;
    const genre = (document.getElementById("newGenre") as HTMLInputElement).value;
    const director = (document.getElementById("newDirector") as HTMLInputElement).value;
    const year = (document.getElementById("newYear") as HTMLInputElement).value;
    const rating = (document.getElementById("newRating") as HTMLInputElement).value;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("director", director);
    formData.append("year", year);
    formData.append("rating", rating);

    this.http.post(this.APIUrl + "AddMovie", formData)
      .subscribe(() => {
        this.refreshMovies();
      });

  }

  deleteMovie(id: any): void {

    this.http.delete(this.APIUrl + "DeleteMovie?id=" + id)
      .subscribe(() => {
        this.refreshMovies();
      });

  }

}