import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectTeacherRoutingModule } from './subject-teacher-routing.module';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers/teachers.component';


@NgModule({
  declarations: [
    AddTeacherComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    SubjectTeacherRoutingModule
  ]
})
export class SubjectTeacherModule { }
