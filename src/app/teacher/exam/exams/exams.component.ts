import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Exam, Subject } from 'src/app/core/models';
import { ExamService } from '../../services/exam.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public subject$!: Observable<Subject>;
  public exams$!: Observable<Array<Exam>>;
  public refreshedExams$ = new BehaviorSubject<boolean>(true);
  public subjectId: string | null;

  constructor
  (
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
    private readonly examService: ExamService
  ) { 
      this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.exams$! = this.refreshedExams$.pipe(switchMap(_ => this.subjectService.getSubjectExams(this.subjectId)));
  }

  public refreshExams() {
    this.refreshedExams$.next(true);
  }
  
  public deleteExam(examId: number): void {
    this.examService.deleteExam(examId)
    .pipe(take(1))
    .subscribe(() => {
      this.refreshExams();
    });
  }
  
}
