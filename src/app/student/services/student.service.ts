import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { StudentExam, Subject } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl: string = AppSettings.API_ENDPOINT + '/';
  constructor
  (
    private readonly http: HttpClient
  ) { }

  getSubjects(): Observable<Array<Subject>> {
    return this.http.get<any>(`${this.baseUrl}students/subjects`);
  }

  getSubjectExamsOfStudent(subjectId: any): Observable<Array<StudentExam>> {
    return this.http.get<any>(`${this.baseUrl}students/subject/${subjectId}/exams`);
  }
}
