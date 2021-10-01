import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { QuestionType } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/question-types`;
  
  constructor(private readonly http: HttpClient) { }

  public getQuestionTypes(): Observable<Array<QuestionType>> {
    return this.http.get<Array<QuestionType>>(this.baseUrl);
  }

}
