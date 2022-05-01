import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserInfoComponent } from '../edit-user-info/edit-user-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  display = "display: none;"
  displayInfo = "display: none;"
  loadingMsg = '';

  @Input() userData = { username: '', password: '', email: '', birthday: '' }

  constructor(
    public fetchApi: FetchApiDataService,
    public dialogRef: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadingMessage();
  }
  /**
   * function to fetch user data
   * @returns user data object
   */
  getUser():void {
    this.display = "display: flex;"
    this.loadingMsg = 'Loading';
    this.displayInfo = "display: none;"
    this.fetchApi.getUser().subscribe((response: any)=>{
      this.user = response;
      console.log(this.user);
      return this.user
    });
  }
  /**
  * function that deletes user account if yes selected on alert. If account is deleted re-routes app to welcome view
  */
  deleteAccount(){
    const username = localStorage.getItem('username');
    if(confirm(`Are you sure you want to delete your account ${username}?`)) {
      this.fetchApi.deleteUser().subscribe((res)=>{
        console.log(res);
      });
      this.router.navigate(['welcome']);
      localStorage.clear();
    }
  }
  /**
   * loading message while user data is fetched
   */
  loadingMessage(){
    this.getUser();
      this.display = "display: none;"
      this.loadingMsg = '';
      this.displayInfo = "display: flex;"
  }
 /**
  * function to format user birthday
  * @param date 
  * @returns user birthday mm/dd/yyyy format
  */
  stringToDate(date: any){
    var rawDate = new Date(date);
    var month = rawDate.getMonth() // 0 based
    var day = rawDate.getDate() // 0 based
    var year = rawDate.getFullYear()
    const dateFormat = `${month+1}/${day+1}/${year}`
    return dateFormat;
  }
  /**
   * function that displays dialog for edit user view. Displays form for user to submit updated information.
   */
  openEditUserDialog(): void {
    this.dialogRef.open(EditUserInfoComponent, {
      width: '280px'
    });
  }

}
