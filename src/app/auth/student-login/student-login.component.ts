import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {

  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router) { }

    public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.studentLogin(username, password).subscribe((data) => {
      localStorage.setItem("token_id", data.tokenId);
      this.router.navigate(['/student/subjects']);
    }
    );
  }

}
