import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent {
  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public submit(): void {
    if(this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.teacherLogin(username, password)
      .pipe(take(1))
      .subscribe((data) => {
        localStorage.setItem("token_id", data.tokenId);
        this.router.navigate(['/teacher/subjects']);
      });
  }

}
