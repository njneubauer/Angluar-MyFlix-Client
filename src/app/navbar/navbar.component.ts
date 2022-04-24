import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  username = localStorage.getItem('username');

  menuItems = [
    {label: 'Movies'},
    {label: 'Profile'},
    {label: 'Logout', icon: 'login'},
  ]
  
  constructor(
    public fetch: FetchApiDataService,
    public router: Router,
  ) { }
  
  ngOnInit(): void {
  }

  capitalizeFirstLetter(string: any){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toLink(pageLabel: string){
    switch(pageLabel){
      case 'Movies':
        this.router.navigate(['movies']);
        break
      case 'Profile':
        this.router.navigate(['profile']);
        break
      case "Logout":
        localStorage.clear();
        this.router.navigate(['welcome']);
        break
    }
  }

  toProfile(){
    this.router.navigate(['profile']);
  }

}
