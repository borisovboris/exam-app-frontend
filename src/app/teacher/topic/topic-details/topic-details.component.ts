import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { Question, Topic } from 'src/app/core/models';
import { QuestionService } from '../../services/question.service';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  public topic$!: Observable<Topic>;
  public questions$!: Observable<Array<Question>>;
  public topicId: string | null;
  public subjectId: string | null;
  public selectedQuestion!: Question;
  public showQuestionDetails: boolean = false;

  constructor
    (
      private readonly route: ActivatedRoute,
      private readonly topicService: TopicService,
      private readonly questionService: QuestionService,
    ) {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    this.topicId = this.route.snapshot.paramMap.get('topic-id');
  }

  public ngOnInit(): void {
    this.topic$ = this.topicService.getTopic(this.topicId);
    this.questions$ = this.topicService.getTopicQuestions(this.topicId);
  }


  public getQuestion(questionId: number): void {
    this.questionService.getQuestion(questionId)
      .pipe(take(1))
      .subscribe((question) => {
        this.showQuestionDetails = true;
        this.selectedQuestion = question;
      });
  }

  public refreshQuestions(): void {
    this.questions$ = this.topicService.getTopicQuestions(this.topicId);
  }

  public closeQuestionDetails(): void {
    this.showQuestionDetails = false;
  }

  public deleteQuestion(questionId: number): void {

    this.questionService.deleteQuestion(questionId)
      .pipe(take(1))
      .subscribe(() => {
        this.refreshQuestions();
      });

  }

}
