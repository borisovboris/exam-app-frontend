import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { SubjectsComponent } from './subjects/subjects.component';
import { SharedModule } from '../shared/shared.module';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { StudentExamDetailsComponent } from './student-exam-details/student-exam-details.component';

@NgModule({
  declarations: [SubjectsComponent, SubjectDetailsComponent, StudentExamDetailsComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
