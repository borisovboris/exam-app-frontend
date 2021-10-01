import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSessionComponent } from './add-session/add-session.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { SessionsComponent } from './sessions/sessions.component';
import { StudentExamDetailsComponent } from './student-exam-details/student-exam-details.component';

const routes: Routes =[
  {path: '', children: [
    { path: 'add', component: AddSessionComponent },
    { path: ':session-id/student-exams/:student-exam-id', component: StudentExamDetailsComponent },
    { path: ':session-id', component: SessionDetailsComponent },
    { path: '', component: SessionsComponent, pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
