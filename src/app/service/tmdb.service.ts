import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie, Movies } from '../Model/trending';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor( private http:HttpClient ) {  }

  base_url:string = 'https://api.themoviedb.org/3/'
  API_key:string = '63a67cc937a4637ce438eac6a0a4cdb4'
  public detailfilm:any;

  trending(day:string,type:string):Observable<Movie[]>{
    return this.http.get <Movies> (`${this.base_url}/trending/${type}/${day}`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  popular(type:string):Observable<Movie[]>{
    return this.http.get <Movies> (`${this.base_url}/${type}/popular`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  topRated():Observable<Movie[]>{
    return this.http.get <Movies> (`${this.base_url}/movie/top_rated`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  detailmovie(id:number){
    return this.http.get(`${this.base_url}/movie/${id}`,{
      params:{
        api_key:this.API_key,
      }
    })
  }

  similar(movieid:number):Observable<Movie[]>{
    console.log(movieid);

    return this.http.get <Movies> (`${this.base_url}/movie/${movieid}/similar`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  recommended(movieid:number):Observable<Movie[]>{
    return this.http.get <Movies> (`${this.base_url}/movie/${movieid}/recommendations`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  moviereview(id:number){
    return this.http.get(`${this.base_url}/movie/${id}/reviews`,{
      params:{
        api_key:this.API_key,
      }
    })
  }

  movieposters(id:number){
    return this.http.get(`${this.base_url}/movie/${id}/images`,{
      params:{
        api_key:this.API_key,
      }
    })
  }

  movievideos(id:number){
    return this.http.get(`${this.base_url}/movie/${id}/videos`,{
      params:{
        api_key:this.API_key,
      }
    })
  }

  getSearchMovies(searchKey:any ){
    return this.http.get<Movies>(`${this.base_url}/search/movie`, {
      params: {
        api_key: this.API_key,
        query:searchKey
      }
    }).pipe(map(res => res.results))
  }

  titlepic():Observable<Movie[]>{
    return this.http.get <Movies> (`${this.base_url}/trending/all/day`,{
      params:{
        api_key:this.API_key
      }
    }).pipe(map(res => res.results))
  }

  // ---------------------------------------------detail-page-------------------------------------------------------------

  cast(id:number){
    return this.http.get(`${this.base_url}/movie/${id}/credits`,{
      params:{
        api_key:this.API_key,
      }
    })
  }

}
