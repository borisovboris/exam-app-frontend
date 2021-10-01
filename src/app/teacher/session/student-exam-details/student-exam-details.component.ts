import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StudentExam } from 'src/app/core/models';
import { StudentAnswerService } from 'src/app/shared/services/student-answer.service';
import { StudentExamService } from '../../services/student-exam.service';

@Component({
  selector: 'app-student-exam-details',
  templateUrl: './student-exam-details.component.html',
  styleUrls: ['./student-exam-details.component.css']
})
export class StudentExamDetailsComponent implements OnInit {
  public studentExamQuestions$!: Observable<any>;
  public studentExam$!: Observable<StudentExam>;
  public studentExamId: string | null;

  constructor
  (
    private readonly studentExamService: StudentExamService,
    private readonly studentAnswerService: StudentAnswerService,
    private readonly route: ActivatedRoute
  ) {
    this.studentExamId = this.route.snapshot.paramMap.get('student-exam-id');
  }

  public ngOnInit(): void {
    this.studentExamQuestions$ = this.studentExamService.getStudentExamQuestionsTeacher(this.studentExamId);
    this.studentExam$ = this.studentExamService.getStudentExam(this.studentExamId);
  }
  
  public assessAnswer(event: any, studentAnswerId: number): void {
    const earnedPoints = event.target.value;
    
    if(studentAnswerId) {
      this.studentAnswerService.assessAnswer(earnedPoints, studentAnswerId)
      .pipe(take(1))
      .subscribe();
    }
  }

}
