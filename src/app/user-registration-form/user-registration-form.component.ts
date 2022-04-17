import { Component, OnInit, Input } from '@angular/core';

// close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };
  
  display = "display: none;"
  loadingMsg = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {}
  
  // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.loadingMsg = "Attempting to Register User";
    this.display = "display: block;";

    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.loadingMsg = "";
      this.display = "display: none;"
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Account sucessfully created!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.loadingMsg = "";
      this.display = "display: none;"
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
