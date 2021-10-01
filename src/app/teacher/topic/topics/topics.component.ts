import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Subject, Topic } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public subject$!: Observable<Subject>;
  public topics$!: Observable<Array<Topic>>;
  public refreshedTopics$ = new BehaviorSubject<boolean>(true);
  public subjectId: string | null;

  constructor
    (
      private readonly route: ActivatedRoute,
      private readonly subjectService: SubjectService,
      private readonly topicService: TopicService
  ) {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.topics$ = this.refreshedTopics$.pipe(switchMap(_ => this.subjectService.getSubjectTopics(this.subjectId)));
  }

  public refreshTopics() {
    this.refreshedTopics$.next(true);
  }

  public deleteTopic(topicId: number): void {
    this.topicService.deleteTopic(topicId)
      .pipe(take(1))
      .subscribe(() => {
        this.refreshTopics();
      })
  }
}
