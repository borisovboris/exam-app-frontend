import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatchPasswords } from '../../helpers/match-passwords.validator'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent {
  public registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },
    { validator: MatchPasswords });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public submit(): void {
    if(this.registerForm.invalid) {
      return;
    }

    const { username, password, email } = this.registerForm.value;

    this.authService.teacherRegister(username, password, email)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/auth/teacher-login']);
      });
  }

}
