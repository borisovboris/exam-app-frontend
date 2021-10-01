import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { SubjectsComponent } from './subjects/subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SharedModule } from '../shared/shared.module';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';


@NgModule({
  declarations: [
    SubjectsComponent, 
    AddSubjectComponent, 
    SubjectDetailsComponent, SubjectEditComponent, 
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
  ]
})
export class TeacherModule { }
