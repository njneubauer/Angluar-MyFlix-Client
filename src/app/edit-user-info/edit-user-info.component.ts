import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss']
})
export class EditUserInfoComponent implements OnInit {
  
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  loadingMsg = '';
  display = 'display: none;';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserInfoComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  editUserInfo(): void {
    this.loadingMsg = "Attempting to Register User";
    this.display = "display: block;";
    console.log(this.userData)
    this.fetchApiData.updateUserInfo(this.userData).subscribe((result) => {
      this.loadingMsg = "";
      this.display = "display: none;";
      this.dialogRef.close(); // This will close the modal on success!
      // refreshes page to show updated user info
      this.router.navigateByUrl('/movies', { skipLocationChange: true }).then(() => {
        this.router.navigate(['profile']);
    }); 
      this.snackBar.open('Profile sucessfully updated!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.loadingMsg = "";
      this.display = "display: none;";
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
