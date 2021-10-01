import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  public subjectId: string | null;
  public subjectEditForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]] 
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
    ) { 
      this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    }

  public ngOnInit(): void {
    this.subjectService.getSubject(this.subjectId)
    .pipe(take(1))
    .subscribe((subject) => {
      this.subjectEditForm.patchValue({ name: subject.name });
      this.subjectEditForm.patchValue({ description: subject.description });
    });
  }

  public submit() {
    if(this.subjectEditForm.invalid) {
      return;
    }
    
    const { name, description } = this.subjectEditForm.value;

    this.subjectService.editSubject(this.subjectId, name, description)
    .pipe(take(1))
    .subscribe(() => {
        this.router.navigate(['/teacher/subjects']);
    });

  }

}
