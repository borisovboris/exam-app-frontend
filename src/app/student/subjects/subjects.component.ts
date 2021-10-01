import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/core/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  public subjects$!: Observable<Array<Subject>>;

  constructor
  (
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subjects$ = this.studentService.getSubjects();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
