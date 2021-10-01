import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Student, Subject } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students$!: Observable<Array<Student>>;
  public refreshedStudents$ = new BehaviorSubject<boolean>(true);
  public subject$!: Observable<Subject>;
  public subjectId: string | null;

  constructor
    (
      private readonly subjectService: SubjectService,
      private readonly route: ActivatedRoute,
  ) {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.students$ = this.refreshedStudents$.
      pipe(switchMap(_ => this.subjectService.getSubjectStudents(this.subjectId)));
  }

  public refreshStudents(): void {
    this.refreshedStudents$.next(true);
  }

  public removeStudentFromSubject(studentId: number): void {
    this.subjectService.removeStudentFromSubject(this.subjectId, studentId)
      .pipe(take(1))
      .subscribe(() => {
        this.refreshStudents();
      });

  }

}
