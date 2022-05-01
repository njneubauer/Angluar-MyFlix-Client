import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// Components import
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
  }
  /**
   * function that opens registration dialog when the "sign up" button is clicked
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  /**
   * function that opens registration dialog when the "login" button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }

}
