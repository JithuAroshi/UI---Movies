import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string) {
    return this.http.post(
      `${this.baseURl}/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

}
