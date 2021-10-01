import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'src/app/core/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  public refreshedSubjects$ = new BehaviorSubject<boolean>(true);
  public subjects$!: Observable<Array<Subject>>;

  constructor(
    private readonly teacherService: TeacherService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.subjects$ = this.refreshedSubjects$.pipe(switchMap(_ => this.teacherService.getTeacherSubjects()));
  }

  public refreshSubjects(): void {
    this.refreshedSubjects$.next(true);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
