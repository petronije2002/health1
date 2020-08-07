import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav

  mode = new FormControl('push')

  constructor(public srv: AuthService) { }

  color
  reason = '';

  isAdmin = true
  
  ngOnInit(): void {
  }


  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


  paletteColour='primary'

selected
change(n) {
  this.paletteColour = 'warn';
  this.selected=n;
  console.log(this.selected);
}



}
