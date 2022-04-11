import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Angluar-MyFlix-Client';

  constructor(public dialog: MatDialog){}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }

  openMovieCardDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
  
}
