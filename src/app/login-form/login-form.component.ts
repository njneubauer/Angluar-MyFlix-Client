import { Component, OnInit, Input } from '@angular/core';
// close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: ''};

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result)=>{
      // succesful login logic will be here
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.username);
      this.dialogRef.close(); // close modal on success
      this.snackBar.open('Successful Login', 'OK',{
        duration: 2000
      });
    }, (result)=>{
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
