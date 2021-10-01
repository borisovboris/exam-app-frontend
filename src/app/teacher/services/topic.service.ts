import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/core/app-settings';
import { Question, Topic } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/topics`;

  constructor(
    private readonly http: HttpClient
  ) { }

  createTopic(name: string, subjectId: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, { name, subjectId })
  }

  editTopic(topicId: any, name: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${topicId}`, { name });
  }

  getTopic(topicId: any): Observable<Topic> {
    return this.http.get<Topic>(`${this.baseUrl}/${topicId}`);
  }

  getTopicQuestions(topicId: any): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(`${this.baseUrl}/${topicId}/questions`);
  }

  deleteTopic(topicId: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${topicId}`);
  }

}
