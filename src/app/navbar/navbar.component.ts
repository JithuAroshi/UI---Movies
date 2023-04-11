import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  menu:boolean = false;
  Search!:string;


  constructor() { }

  Menuchange(){
this.menu = !this.menu
  }

}
