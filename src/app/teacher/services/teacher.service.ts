import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Subject } from 'src/app/core/models';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly baseUrl: string = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  public getTeacherSubjects(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.baseUrl}/teachers/subjects`);
  }
  
}
