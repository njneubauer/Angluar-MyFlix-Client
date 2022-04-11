import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = []; 
  base64Image: any[] = [];
  
  constructor(
    public fetchMovies: FetchApiDataService,
    private sanitize: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response: any)=>{
      this.movies = response;
      this.movies.forEach(m=>{
        m.imageCode2 = this.sanitize.bypassSecurityTrustUrl(`data:image/png;base64, ${m.imageCode}`)
      });
      console.log(this.movies);
      return this.movies;
    });
  }
  

}
