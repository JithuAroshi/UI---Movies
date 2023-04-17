import { ThisReceiver } from '@angular/compiler';
import { Component , HostListener } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { Movie } from '../Model/trending';
import { TmdbService } from '../service/tmdb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  $dayweek = new BehaviorSubject<'day' | 'week'> ('day');
  $type = new BehaviorSubject< 'movie' | 'tv'> ('movie');
  $tp = new BehaviorSubject<'trending' | 'popular'> ('trending')

  $trending_array?:Observable<Movie[]>;
  topRated_array?:Movie[];
  upcoming_array?:Movie[];
  imageObject: Array<object>=[];
  titlearray?:Movie[];
  head_array?:Movie;
  head_array_B?:Movie;
  head_array_A?:Movie;

  math = Math;
  imageURL:string = 'https://image.tmdb.org/t/p/original';
  image_url:string = 'https://image.tmdb.org/t/p/original';
  num:number = Math.floor(Math.random() * 19)+1
  switch?:boolean;
  switch2?:boolean;
  switch3?:boolean;
  sidebar:Observable<boolean>;

  moviename:string = 'Trending';
  Users?:any[];


  constructor( public Trend:TmdbService ) {

this.sidebar = this.Trend.$navbar
console.log(this.sidebar)

    this.Trend.titlepic().subscribe(val =>{
      // console.log(val);
  this.head_array = val[this.num];
  this.head_array_B = val[this.num - 1];
  this.head_array_A = val[this.num + 1];
    })

this.$trending_array = combineLatest([
  this.$dayweek,
  this.$type,
  this.$tp,
]).pipe(
  switchMap(([time,type,tp]) => {
    if (tp == 'trending') {
      return this.Trend.trending(time,type);
    }else{
      return this.Trend.popular(type)
    }
  }
))

this.Trend.topRated().subscribe(val => {
  this.topRated_array = val
})

this.Trend.upcoming().subscribe(val => {
  this.upcoming_array = val
})

this.Trend.users().subscribe(val => {
  this.Users = val;
})



  }


  changetime(current:'day' | 'week'){
    this.switch = !this.switch
this.$dayweek.next(current == 'day'? 'week':'day');
  }

  changetype(current:'movie' | 'tv'){
    this.switch2 = !this.switch2
this.$type.next(current == 'movie'? 'tv':'movie');
  }

  changeshow(current:'trending' | 'popular'){
    this.switch3 = !this.switch3

    if(!this.switch3){
      this.moviename = 'Trending'
    }
    if(this.switch3){
      this.moviename = 'Popular'
    }
this.$tp.next(current == 'trending'? 'popular':'trending');
  }







  min(){

    if(this.num == 1){
      this.num = 17
    }else{
      this.num -= 1
    }

    this.Trend.titlepic().subscribe(val =>{
      this.head_array = val[this.num]
      this.head_array_B = val[this.num - 1];
      this.head_array_A = val[this.num + 1];
    })

    }

      add(){

        if(this.num == 17){
        this.num = 1
        }else{
          this.num += 1
        }

        this.Trend.titlepic().subscribe(val =>{
          this.head_array = val[this.num]
          this.head_array_A = val[this.num + 1];
          this.head_array_B = val[this.num - 1];
        })
  }

  ratingcolor2(rate:number){
    if(rate >= 70 ) return "#204529";
    if(rate >= 50 ) return "#423d0f";
    if(rate <= 49 ) return "#571435";
    return "none"
  }

  ratingcolor(rate:number){
    if(rate >= 70 ) return "#21d07a";
    if(rate >= 50 ) return "#d2d531";
    if(rate <= 49 ) return "#db2360";
    return "none"
  }

}

