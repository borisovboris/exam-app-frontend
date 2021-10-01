import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';

@Injectable({
  providedIn: 'root'
})
export class StudentChoiceService {
  private readonly baseUrl: string = AppSettings.API_ENDPOINT;
  constructor
  (
    private readonly http: HttpClient
  ) { }

  public selectChoice(
    studentExamId: number, 
    sessionQuestionId: number, 
    sessionChoiceId: number, 
    checked: boolean
    ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/student-choices/select-choice`, { 
      studentExamId,
      sessionQuestionId,
      sessionChoiceId,
      checked
    });
  }

}
