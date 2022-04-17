import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  // @param data

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
     genreInfo: any[];
    }
  ) { }

  ngOnInit(): void {
  }

}
