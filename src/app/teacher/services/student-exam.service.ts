import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { StudentExam } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/student-exams`;
  
  constructor
  (
    private readonly http: HttpClient
  ) {}

  public getStudentExamQuestionsTeacher(studentExamId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${studentExamId}/teacher`);
  }

  public getStudentExamQuestionsStudent(studentExamId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${studentExamId}/student`);
  }

  public getStudentExam(studentExamId: any): Observable<StudentExam> {
    return this.http.get<StudentExam>(`${this.baseUrl}/${studentExamId}`);
  }
}
