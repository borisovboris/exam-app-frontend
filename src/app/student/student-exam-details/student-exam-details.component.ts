import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StudentExamService } from 'src/app/teacher/services/student-exam.service';
import { StudentAnswerService } from 'src/app/shared/services/student-answer.service';
import { StudentChoiceService } from '../services/student-choice.service'
import { StudentExam } from 'src/app/core/models';

@Component({
  selector: 'app-student-exam-details',
  templateUrl: './student-exam-details.component.html',
  styleUrls: ['./student-exam-details.component.css']
})
export class StudentExamDetailsComponent implements OnInit {
  public studentExam$!: Observable<StudentExam>;
  public studentExamQuestions$!: Observable<any>;
  public studentExamId!: string | null;

  constructor
  (
    private readonly studentExamService: StudentExamService,
    private readonly studentChoiceService: StudentChoiceService,
    private readonly studentAnswerService: StudentAnswerService,
    private readonly route: ActivatedRoute
  ) { 
    this.studentExamId = this.route.snapshot.paramMap.get('student-exam-id');
  }

  ngOnInit(): void {
    this.studentExamQuestions$ = this.studentExamService.getStudentExamQuestionsStudent(this.studentExamId);
    this.studentExam$ = this.studentExamService.getStudentExam(this.studentExamId);
  }

  public selectChoice(event: any, studentExamId: number, sessionQuestionId: number, sessionChoiceId: number): void {
    const checked = event.target.checked;
    this.studentChoiceService.selectChoice(studentExamId, sessionQuestionId, sessionChoiceId, checked)
    .pipe(take(1))
    .subscribe();
  }

  public giveAnswer(event: any, studentExamId: number, sessionQuestionId: number): void {
    const studentAnswerText: string = event.target.value;
    this.studentAnswerService.giveAnswer(studentAnswerText, studentExamId, sessionQuestionId)
    .pipe(take(1))
    .subscribe();
  }
}
