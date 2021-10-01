import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Session, StudentExam } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/sessions`;

  constructor(private readonly http: HttpClient) { }

  public createSession(data: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, data);
  }

  public getSessionStudentExams(sessionId: any): Observable<Array<StudentExam>> {
   return this.http.get<any>(`${this.baseUrl}/${sessionId}/student-exams`);
  }

  public getSession(sessionId: any): Observable<Session> {
    return this.http.get<Session>(`${this.baseUrl}/${sessionId}`);
  }
}
