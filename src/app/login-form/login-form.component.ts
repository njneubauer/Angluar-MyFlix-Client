import { Component, OnInit, Input } from '@angular/core';
// close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: ''};

  display = "display: none;";
  loadingMsg = ""

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ){}

  ngOnInit(): void {
  }

  loginUser(): void {
    this.loadingMsg = "Attempting Login..."
    this.display = "display: block;";
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      // Router Logic
      this.router.navigate(['movies']);
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.user.username);
      // progress bar hidden
      this.loadingMsg = ""
      this.display = "display: none;";
      // result modal
      this.dialogRef.close(); // close modal on success
    }, (result)=>{
      // progress bar hidden
      this.loadingMsg = ""
      this.display = "display: none;";
      // result modal
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
