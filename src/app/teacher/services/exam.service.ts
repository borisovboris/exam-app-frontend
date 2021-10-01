import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Exam, Question } from 'src/app/core/models';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/exams`;

  constructor(private readonly http: HttpClient) { }

  public createExam(name: string, subjectId: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, { name, subjectId });
  }

  public editExam(examId: any, name: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${examId}`, { name });
  }
 
  public getExam(examId: any): Observable<Exam> {
    return this.http.get<any>(`${this.baseUrl}/${examId}`);
  }

  public addQuestionToExam(examId: any, questionId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-question`, { examId, questionId });
  }

  public getExamQuestions(examId: any): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(`${this.baseUrl}/${examId}/questions`);
  }

  public removeQuestionFromExam(examId: any, questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${examId}/remove-question/${questionId}`);
  }

  public deleteExam(examId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${examId}`);
  }
}
