import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullImagePath: string;
  constructor() {
    this.fullImagePath = 'assets/image/Emblem_of_Sri_Lanka.svg.png';
  }

  ngOnInit() {
  }

}