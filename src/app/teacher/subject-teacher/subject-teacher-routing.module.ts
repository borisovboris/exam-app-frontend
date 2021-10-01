import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'add', component: AddTeacherComponent },
    { path: '', component: TeachersComponent, pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectTeacherRoutingModule { }
