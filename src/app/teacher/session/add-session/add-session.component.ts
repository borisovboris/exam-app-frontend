import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Exam } from 'src/app/core/models';
import { SessionService } from '../../services/session.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {
  // @ViewChild('datePicker') datePicker!: ElementRef;

  public sessionForm = this.fb.group({
    name: ['', [Validators.required]],
    date: ['', [Validators.required]],
    examId: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]]
  });
  public students = new FormArray([]);

  public subjectId!: string | null;
  public subject$!: Observable<any>;
  public exams$!: Observable<Array<Exam>>;

  constructor
    (
      private readonly route: ActivatedRoute,
      private readonly subjectService: SubjectService,
      private readonly sessionService: SessionService,
      private readonly fb: FormBuilder,
      private readonly router: Router
    ) { }

  public ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.exams$ = this.subjectService.getSubjectExams(this.subjectId).pipe(tap(exams => {
      if (!exams) { return; }
      const examId = exams[0].id;
      this.sessionForm.patchValue({ examId });
    })
    );

    this.subjectService.getSubjectStudents(this.subjectId)
      .pipe(take(1))
      .subscribe((students) => {
        students.map((student: any) => {
          this.students.push(new FormControl({ ...student, isChecked: true }));
        })
      });

  }

  public createSession(): void {
    if (this.sessionForm.invalid) {
      return;
    }

    const { name, date, examId, start, end } = this.sessionForm.value;

    // format of incoming date
    // Tue Apr 06 2021 00:00:00 GMT+0300 (GMT+03:00)
    const tokens = date.toString().split(' ');

    // interpolate start time into the string of date
    tokens[4] = `${start}:00`;
    const startTime = tokens.join(' ');

    // interpolate end time into the string of date
    tokens[4] = `${end}:00`;
    const endTime = tokens.join(' ');

    const studentIds = this.students.controls
      .map((control: any) => {
        if (control.value.isChecked) {
          return control.value.id;
        }
        return undefined;

      }).filter(item => {
        return item !== undefined;
      });

    if (studentIds.length <= 0) {
      return;
    }

    this.sessionService.createSession({
      name,
      subjectId: this.subjectId,
      examId,
      studentIds,
      startTime,
      endTime,
    }).pipe(take(1))
      .subscribe((data) => {
        this.router.navigate([`/teacher/subjects/${this.subjectId}/sessions`]);
      })

  }


}
