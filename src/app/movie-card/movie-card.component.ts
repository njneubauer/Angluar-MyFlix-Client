import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = []; 
  
  constructor(
    public fetchMovies: FetchApiDataService,
    private sanitize: DomSanitizer
  ){}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response: any)=>{
      this.movies = response;
      return this.movies;
    });
  }

  sanitizeResource(movie: any){
    return this.sanitize.bypassSecurityTrustUrl(`data:image/png;base64, ${movie.imageCode}`);
  }

  scrollLeft(){
    var container = document.getElementById('card-container');
    if(!container) return;
    container.scrollLeft += -220;
  }

  scrollRight(){
    var container = document.getElementById('card-container');
    if(!container) return;
    container.scrollLeft += 220;
  }

}
