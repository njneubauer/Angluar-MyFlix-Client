import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare the api url that will provide data for the client app
const apiUrl = 'https://nickflixapi.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'registration', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieId', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:director', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:genre', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.get(apiUrl + `user/${user}`, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.get(apiUrl + `user/${user}`, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavoriteMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.post(apiUrl + `${user}/addmovie/${movieTitle}`, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  updateUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.put(apiUrl + `user/update/${user}`, userDetails, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  deleteFavoriteMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.delete(apiUrl + `${user}/favorites/delete/${movieTitle}`, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.delete(apiUrl + `remove/${user}`, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Error Handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } 
    else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error.message || error.error }`);
    }
    return throwError(()=> new Error(error.error.message ? error.error.message : "Something went wrong"));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
}
