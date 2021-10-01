import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/student-answers`;
  constructor
  (
    private readonly http: HttpClient
  ) { }

  public giveAnswer(
    studentAnswerText: string, 
    studentExamId: number, 
    sessionQuestionId: number
    ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/give-answer`, {
      studentAnswerText,
      studentExamId,
      sessionQuestionId
    });
  }

  public assessAnswer(earnedPoints: number, studentAnswerId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/assess`, 
    { earnedPoints, studentAnswerId });
  }
  
}
