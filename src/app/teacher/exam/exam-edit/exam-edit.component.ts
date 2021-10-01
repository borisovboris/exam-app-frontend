import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {

  subjectId!: string | null;
  examId!: string | null;
  examEditForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly examService: ExamService
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    this.examId = this.route.snapshot.paramMap.get('exam-id');
  }

  ngOnInit(): void {
    this.examService.getExam(this.examId)
    .pipe(take(1))
    .subscribe((exam) => {
      const { name } = exam;
      this.examEditForm.patchValue({ name });
    })
  }

  submit(): void {
    if(this.examEditForm.invalid) {
      return;
    }

    const { name } = this.examEditForm.value;

    this.examService.editExam(this.examId, name)
    .pipe(take(1))
    .subscribe((data) => {
      this.router.navigate([`/teacher/subjects/${this.subjectId}/exams`]);
    });
  }

}
