import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';
import { ExamsComponent } from './exams/exams.component';

 // { path: ':id/exams/add-exam', component: AddExamComponent},
    // { path: ':id/exams/:exam-id', component: ExamDetailsComponent},
    // { path: ':id/exams', component: ExamsComponent },


const routes: Routes = [
  {path: '', children: [
    { path: 'add', component: AddExamComponent },
    { path: ':exam-id/edit', component: ExamEditComponent },
    { path: ':exam-id', component: ExamDetailsComponent },
    { path: '', component: ExamsComponent, pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
