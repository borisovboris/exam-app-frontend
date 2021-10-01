import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatchPasswords } from 'src/app/helpers/match-passwords.validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {

  public registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    facultyNumber: ['', [Validators.required]],
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
    
    const { username, email, facultyNumber, password } = this.registerForm.value;

    this.authService.studentRegister(username, email, facultyNumber, password)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/auth/student-login']);
      });
  }

}
