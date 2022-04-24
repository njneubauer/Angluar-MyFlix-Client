import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {

  movies: any[] = []; 
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private sanitize: DomSanitizer,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any)=>{
      this.movies = response.filter((movie: any)=>{
        return this.favoriteMovies.includes(movie._id);
      });
      return this.movies;
    });
  }

  getFavoriteMovies():void {
    this.fetchApiData.getUser().subscribe((response: any)=>{
      this.favoriteMovies = response.favoriteMovies
      console.log(response);
    });
  }

  addToFavorites(movieTitle: string):void{
    this.fetchApiData.addFavoriteMovie(movieTitle).subscribe((response)=>{ 
      this.ngOnInit();
    });
    this.getFavoriteMovies();
  }

  deleteFromFavorites(movieTitle: string){
    this.fetchApiData.deleteFavoriteMovie(movieTitle).subscribe((response)=>{ 
      this.ngOnInit();
    });
    this.getFavoriteMovies();
  }

  isFavorite(movieTitle: string): boolean {
    return this.favoriteMovies.includes(movieTitle);
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFromFavorites(movie.title)
      : this.addToFavorites(movie.title);
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
