import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Movie Tracker';

  readonly APIUrl = 'http://localhost:5038/api/movies/';

  movies:any[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.refreshMovies();
  }

  refreshMovies(){
    this.http.get<any[]>(this.APIUrl+'GetMovies').subscribe(data=>{
      this.movies=data;
    });
  }

  addMovie(){

    const title=(document.getElementById('newTitle') as HTMLInputElement).value;
    const genre=(document.getElementById('newGenre') as HTMLInputElement).value;
    const director=(document.getElementById('newDirector') as HTMLInputElement).value;
    const year=(document.getElementById('newYear') as HTMLInputElement).value;
    const rating=(document.getElementById('newRating') as HTMLInputElement).value;

    const formData=new FormData();
    formData.append("title",title);
    formData.append("genre",genre);
    formData.append("director",director);
    formData.append("year",year);
    formData.append("rating",rating);

    this.http.post(this.APIUrl+'AddMovie',formData).subscribe(data=>{
      alert(data);
      this.refreshMovies();
    });

  }

  deleteMovie(id:any){
    this.http.delete(this.APIUrl+'DeleteMovie?id='+id).subscribe(data=>{
      alert(data);
      this.refreshMovies();
    })
  }

}