import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginObj);
  }

  signup(signupObj: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signup`, signupObj);
  }

}
