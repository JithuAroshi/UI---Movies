import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../Model/trending';
import { TmdbService } from '../service/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

$SearchMovies?:Movie[];
image_url:string = 'https://image.tmdb.org/t/p/original';

switch:boolean = false;

constructor( private service : TmdbService , private route : ActivatedRoute ) {}

ngOnInit(): void {
this.route.params.subscribe(val => {
  if(val['search'] == 'undefined'){
  this.switch = true
  }else{
  this.service.getSearchMovies(val['search']).subscribe(val => {
    this.$SearchMovies = val
    console.log(this.$SearchMovies);
  })

  }
})


}

}
