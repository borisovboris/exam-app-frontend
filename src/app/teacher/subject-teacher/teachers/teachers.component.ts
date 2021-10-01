import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Teacher } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  public subject$!: Observable<any>;
  public teachers$!: Observable<Array<Teacher>>;
  public refreshedTeachers$ = new BehaviorSubject<boolean>(true);
  public subjectId: string | null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly subjectService: SubjectService,
  ) {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.teachers$ = this.refreshedTeachers$
      .pipe(switchMap(_ => this.subjectService.getSubjectTeachers(this.subjectId)));
  }

  public refreshTeachers(): void {
    this.refreshedTeachers$.next(true);
  }

  public removeTeacherFromSubject(teacherId: number): void {
    this.subjectService.removeTeacherFromSubject(teacherId, this.subjectId)
      .pipe(take(1))
      .subscribe(() => {
        this.refreshTeachers();
      });
  }

}
