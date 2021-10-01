import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Teacher } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input') input!: ElementRef;

  public inputSubscription!: Subscription;
  public teachers$!: Observable<Array<Teacher>>;
  public subjectId!: string | null;
  public selectedTeacher!: Teacher | null;

  constructor(
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngAfterViewInit(): void {

    this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup')
    .subscribe(() => {
      const criterion = this.input.nativeElement.value;
      this.teachers$ = this.subjectService.searchTeachers(this.subjectId, criterion);
    });

  }

  public selectTeacher(teacher: Teacher): void {
    this.selectedTeacher = teacher;
  }

  public deselectTeacher(): void {
    this.selectedTeacher = null;
  }

  public submitTeacher(): void {

    if(!this.selectedTeacher) { 
      return;
    }

    this.subjectService.addTeacherToSubject(this.selectedTeacher.id, this.subjectId)
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate([`/teacher/subjects/${this.subjectId}/teachers/`]);
    });

  }

  public ngOnDestroy(): void {
    this.inputSubscription!.unsubscribe();
  }

}
