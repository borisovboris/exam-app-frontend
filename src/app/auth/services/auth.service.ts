import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Token } from 'src/app/core/models';

@Injectable()
export class AuthService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/auth`;
  
  constructor
  (
    private readonly http: HttpClient
  ) { }

  public studentLogin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/student-login`, { username, password });
  }

  public studentRegister(
    username: string, 
    email: string, 
    facultyNumber: string, 
    password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/student-register`, { 
      username, 
      email, 
      facultyNumber, 
      password
    });
  }

  public teacherRegister(username: string, password: string, email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/teacher-register`, 
    { username, password, email });
  }
  
  public teacherLogin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/teacher-login`, { username, password });
  }

}
