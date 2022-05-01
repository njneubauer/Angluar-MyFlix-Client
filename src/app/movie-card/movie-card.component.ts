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
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private sanitize: DomSanitizer,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  /**
   * function to fetch movies from api
   * @returns {json} object for movie details
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any)=>{
      this.movies = response;
      return this.movies;
    });
  }
  /**
   * function that fetches list of user favorite movies
   * getUser() grabs username & token from local storage
   */
  getFavoriteMovies():void {
    this.fetchApiData.getUser().subscribe((response: any)=>{
      this.favoriteMovies = response.favoriteMovies
    });
  }

  /**
   * function adds movie to user favorites
   * @param movieTitle movie title string passed into api
   */
  addToFavorites(movieTitle: string):void{
    this.fetchApiData.addFavoriteMovie(movieTitle).subscribe((response)=>{ 
      this.ngOnInit();
    });
    this.getFavoriteMovies();
  }
  /**
   * function that deletes a movie from the user favorites list
   * @param movieTitle movie title string passed to api
   */
  deleteFromFavorites(movieTitle: string){
    this.fetchApiData.deleteFavoriteMovie(movieTitle).subscribe((response)=>{ 
      this.ngOnInit();
    });
    this.getFavoriteMovies();
  }
  /**
   * function checks to see if movie in the movies array is in user favorites array (used for heart logo)
   * @param movieTitle string of movie ID
   * @returns {boolean} 
   */
  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.includes(movieID);
  }
  /**
   * function used to toggle movie add/delete movie from user favorites based on boolean returned from isFavorite()
   * @param movie object used to pass in params to functions
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFromFavorites(movie.title)
      : this.addToFavorites(movie.title);
  }
  /**
   * function to sanitize imageCode resource
   * @param movie object passed in to access movie.imageCode
   * @returns safe resource url
   */
  sanitizeResource(movie: any){
    return this.sanitize.bypassSecurityTrustUrl(`data:image/png;base64, ${movie.imageCode}`);
  }
  /**
   * function to allow button to scroll container to the left
   * @returns amount of px container moves left per click
   */
  scrollLeft(){
    var container = document.getElementById('card-container');
    if(!container) return;
    container.scrollLeft += -220;
  }
  /**
   * function to allow button to scroll container to the right
   * @returns amount of px container moves right per click
   */
  scrollRight(){
    var container = document.getElementById('card-container');
    if(!container) return;
    container.scrollLeft += 220;
  }
  /**
   * function to open dialogue, pass in genreInfo Object, and  and render genre view
   * @param genreInfo 
   */
  openGenreDialog( genreInfo: Object ): void {
    this.dialog.open(GenreCardComponent, {
      data: { genreInfo },
      width: '500px'
    });
  }
  /**
   * function to open dialogue, pass in directorInfo Object, and render director view
   * @param directorInfo
   */
  openDirectorDialog( directorInfo: Object ): void {
    this.dialog.open(DirectorCardComponent, {
      data: { directorInfo },
      width: '500px'
    });
  }
  /**
   * function to open dialogue, pass movie info, and render synopsis view
   * @param movieTitle 
   * @param moviePlot 
   * @param movieYear 
   */
  openSynopsisDialog( movieTitle: string, moviePlot: string, movieYear: string ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { movieTitle, moviePlot, movieYear },
      width: '500px'
    });
  }
  
}
