import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from '../subject-student/students/students.component';
import { AddStudentComponent } from '../subject-student/add-student/add-student.component';

import { SubjectStudentRoutingModule } from './subject-student-routing.module';


@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentComponent
  ],
  imports: [
    CommonModule,
    SubjectStudentRoutingModule
  ]
})
export class SubjectStudentModule { }
