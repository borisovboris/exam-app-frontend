import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamService } from '../../services/exam.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  subjectId!: string | null;
  subject$!: Observable<any>;
  examForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly subjectService: SubjectService,
    private readonly examService: ExamService
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
  }

  submit(): void {
    if(this.examForm.invalid) {
      return;
    }

    const { name } = this.examForm.value;

    this.examService.createExam(name, this.subjectId).subscribe(() => {
      this.router.navigate([`/teacher/subjects/${this.subjectId}/exams`]);
    });
  }

}
