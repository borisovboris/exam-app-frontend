import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Exam, Session, Student, Subject, Teacher, Topic } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/subjects`;

  constructor(
    private readonly http: HttpClient,
  ) { }

  public searchStudents(subjectId: any, criterion: string): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(`${this.baseUrl}/${subjectId}/search-students/${criterion}`)
  }

  public addStudentToSubject(subjectId: any, studentId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-student-to-subject`,
      { studentId, subjectId });
  }

  public removeStudentFromSubject(subjectId: any, studentId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/remove-student-from-subject`,
      { studentId, subjectId });
  }

  public createSubject(name: string, description: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, { name, description });
  }

  public editSubject(subjectId: any, name: string, description: string): Observable<void> {
      return this.http.patch<void>(`${this.baseUrl}/${subjectId}`, { name, description })
  }

  public getSubject(subjectId: any): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/${subjectId}`);
  }

  public searchTeachers(subjectId:any, criterion: string): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(`${this.baseUrl}/${subjectId}/search-teachers/${criterion}`);
  }

  public getSubjectTeachers(subjectId: any): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(`${this.baseUrl}/${subjectId}/teachers`);
  }

  public getSubjectTopics(subjectId: any): Observable<Array<Topic>> {
    return this.http.get<Array<Topic>>(`${this.baseUrl}/${subjectId}/topics`);
  }

  public addTeacherToSubject(teacherId: number, subjectId: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-teacher-to-subject`,
      { teacherId, subjectId });
  }

  public removeTeacherFromSubject(teacherId: number, subjectId: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/remove-teacher-from-subject`,
      { teacherId, subjectId });
  }

  public getSubjectStudents(subjectId: any): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(`${this.baseUrl}/${subjectId}/students`);
  }

  public getSubjectExams(subjectId: any): Observable<Array<Exam>> {
    return this.http.get<Array<Exam>>(`${this.baseUrl}/${subjectId}/exams`);
  }

  public getSubjectSessions(subjectId: any): Observable<Array<Session>> {
    return this.http.get<Array<Session>>(`${this.baseUrl}/${subjectId}/sessions`);
  }

  public deleteSubject(subjectId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${subjectId}`);
  }
}
