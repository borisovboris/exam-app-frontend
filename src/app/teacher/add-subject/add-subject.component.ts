import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {

  public subjectForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]] 
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly subjectService: SubjectService,
    private readonly router: Router
    ) { }

  submit(): void {
    if(this.subjectForm.invalid) {
      return;
    }

    const { name, description } = this.subjectForm.value;

    this.subjectService.createSubject(name, description)
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/teacher/subjects']);
    });
  }

}
