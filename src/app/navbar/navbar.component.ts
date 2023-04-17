import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TmdbService } from '../service/tmdb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  menu:boolean = false;
  Search!:string;


  trueValue:boolean=true

  constructor( private service : TmdbService ) { }

  Menuchange(data:boolean){
this.menu = !this.menu

this.trueValue=data
this.service.$navbar.next(data)

  }

}
