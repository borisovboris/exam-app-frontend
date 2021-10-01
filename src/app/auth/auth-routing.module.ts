import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';

const routes: Routes = [{
  path: '', children: [
    { path: 'teacher-login', component: TeacherLoginComponent },
    { path: 'teacher-register', component: TeacherRegisterComponent },
    { path: 'student-login', component: StudentLoginComponent },
    { path: 'student-register', component: StudentRegisterComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
