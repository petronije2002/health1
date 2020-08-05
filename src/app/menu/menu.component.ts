import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  color

  initials="P.J"
  isAdmin = true
  
  ngOnInit(): void {
  }


  toggleColor(event_){

    if( this.color === 'red' )
      {this.color = 'blue';}
    else
      {this.color = 'red';}
  
  }

}
