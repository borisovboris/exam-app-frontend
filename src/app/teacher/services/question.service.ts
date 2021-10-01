import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Question } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/questions`;

  constructor
  (
    private readonly http: HttpClient
  ) { }

  public createQuestion(question: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, question);
  }

  public getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${questionId}`);
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${questionId}`);
  }

}
