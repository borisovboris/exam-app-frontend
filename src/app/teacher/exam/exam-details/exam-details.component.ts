import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Exam, Question, Topic } from 'src/app/core/models';
import { ExamService } from '../../services/exam.service';
import { SubjectService } from '../../services/subject.service';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  public exam$!: Observable<Exam>;
  public topics$!: Observable<Array<Topic>>;
  public questions$!: Observable<Array<Question>>;
  public examQuestions$!: Observable<Array<Question>>;
  public examId: string | null;
  public subjectId: string | null;

  constructor
    (
      private readonly examService: ExamService,
      private readonly subjectService: SubjectService,
      private readonly topicService: TopicService,
      private readonly route: ActivatedRoute
    ) {
    this.examId = this.route.snapshot.paramMap.get('exam-id');
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngOnInit(): void {
    this.exam$ = this.examService.getExam(this.examId);
    this.examQuestions$ = this.examService.getExamQuestions(this.examId);
    this.topics$ = this.subjectService.getSubjectTopics(this.subjectId);
  }

  public selectTopic(topicId: string): void {
    this.questions$ = this.topicService.getTopicQuestions(topicId);
  }

  public addQuestion(questionId: number): void {
    this.examService.addQuestionToExam(this.examId, questionId)
    .pipe(take(1))
    .subscribe(() => {
      this.examQuestions$ = this.examService.getExamQuestions(this.examId);
    });
  }

  public removeQuestion(questionId: number): void {
    this.examService.removeQuestionFromExam(this.examId, questionId)
    .pipe(take(1))
    .subscribe(() => {
      this.examQuestions$ = this.examService.getExamQuestions(this.examId);
    })
  }

}
