import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = []; 
  
  constructor(
    public fetchMovies: FetchApiDataService,
    private sanitize: DomSanitizer,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response: any)=>{
      this.movies = response;
      console.log(this.movies);
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

  openGenreDialog( genreInfo: Object ): void {
    this.dialog.open(GenreCardComponent, {
      data: { genreInfo },
      width: '500px'
    });
  }

  openDirectorDialog( directorInfo: Object ): void {
    this.dialog.open(DirectorCardComponent, {
      data: { directorInfo },
      width: '500px'
    });
  }

  openSynopsisDialog( movieTitle: string, moviePlot: string, movieYear: string ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { movieTitle, moviePlot, movieYear },
      width: '500px'
    });
  }

}
