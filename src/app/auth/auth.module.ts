import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [TeacherLoginComponent, TeacherRegisterComponent, StudentLoginComponent, StudentRegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
