import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamsComponent } from './exams/exams.component';

import { ExamRoutingModule } from './exam-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamEditComponent } from './exam-edit/exam-edit.component';

@NgModule({
  declarations: [
    AddExamComponent,
    ExamDetailsComponent,
    ExamsComponent,
    ExamEditComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExamModule { }
