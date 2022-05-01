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
    {label: 'Favorites'},
    {label: 'Profile'},
    {label: 'Logout', icon: 'login'},
  ]
  
  constructor(
    public fetch: FetchApiDataService,
    public router: Router,
  ) { }
  
  ngOnInit(): void {
  }
/**
 * function to route links in navbar to the correct view
 * @param pageLabel string passed into switch statement for route navigation
 */
  toLink(pageLabel: string){
    switch(pageLabel){
      case 'Movies':
        this.router.navigate(['movies']);
        break
      case 'Favorites':
        this.router.navigate(['favorites']);
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

}
