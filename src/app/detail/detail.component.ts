import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { Movie, Movies } from '../Model/trending';
import { TmdbService } from '../service/tmdb.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

image_url:string = 'https://image.tmdb.org/t/p/original';
base_url:string = 'https://api.themoviedb.org/3/';
API_key:string = '63a67cc937a4637ce438eac6a0a4cdb4';
video_url:string = 'https://www.youtube.com/embed'
$similar_array?:Movie[];
$recommended_array?:Movie[];
$VideoKey?: Observable<string>;
detail_array:any;
cast_array:any;

math = Math;

castcrew:boolean = false;
idNo!:any;
idnum:any;
id!:number;
filmid:any
reviews:any;
posters?:any;
videos:any;
videoLink:any;



constructor( private service : TmdbService , private route : ActivatedRoute ) {

  // this.$VideoKey = this.route.params.pipe(
  //   switchMap(params => this.service.movievideos(params['detail'])),
  //   map((videos: any) => videos?.results[0]?.key)
  // )


// this.route.params.subscribe(val => {

// this.service.detailmovie(val['detail']).subscribe(val => {
//   this.detail_array = val;

//   this.service.cast(this.detail_array.id).subscribe(val => {
//     this.cast_array = val;
//   })

//   this.service.similar(this.detail_array.id).subscribe(val => {
//     this.$similar_array = val;
//   })
//   this.service.recommended(this.detail_array.id).subscribe(val => {
//     this.$recommended_array = val;
//   })
//   this.service.moviereview(this.detail_array.id).subscribe(val => {
//     this.reviews = val;
//     console.log(this.reviews);

//   })
//   this.service.movieposters(this.detail_array.id).subscribe(val => {
//     this.posters = val;
//     console.log(this.posters);
//   })
//   this.service.movievideos(this.detail_array.id).subscribe(val => {
//     this.videos = val;
//    this.videoLink= this.videos.results[0].key;
//    console.log(this.videoLink)
//   })
// })

// })




this.route.params.pipe(
  switchMap(val => this.service.detailmovie(val['detail'])),
  tap((detail_array: any) => this.detail_array = detail_array),
  switchMap(detail_array => forkJoin([
    this.service.cast(detail_array.id),
    this.service.similar(detail_array.id),
    this.service.recommended(detail_array.id),
    this.service.moviereview(detail_array.id),
    this.service.movieposters(detail_array.id),
    this.service.movievideos(detail_array.id),
  ])),
).subscribe(([cast_array, similar_array, recommended_array, reviews, posters, videos]) => {
  this.cast_array = cast_array;
  this.$similar_array = similar_array;
  this.$recommended_array = recommended_array;
  this.reviews = reviews;
  this.posters = posters;
  this.videos = videos;
  this.videoLink= this.videos.results[0].key;
  console.log(this.videoLink);
});






}

ngOnInit(){
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);
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

CastCrew(){
  this.castcrew = !this.castcrew
}

}
