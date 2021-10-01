import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [{
  path: '', children: [
    { path: ':subject-id/teachers', loadChildren: () => import('./subject-teacher/subject-teacher.module').then((m) => m.SubjectTeacherModule) },
    { path: ':subject-id/topics', loadChildren: () => import('./topic/topic.module').then((m) => m.TopicModule) },
    { path: ':subject-id/exams', loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule) },
    { path: ':subject-id/students', loadChildren: () => import('./subject-student/subject-student.module').then((m) => m.SubjectStudentModule) },
    { path: ':subject-id/sessions', loadChildren: () => import('./session/session.module').then((m) => m.SessionModule) },
    { path: 'add', component: AddSubjectComponent },
    { path: ':subject-id/edit', component: SubjectEditComponent },
    { path: ':subject-id', component: SubjectDetailsComponent },
    { path: '', component: SubjectsComponent, pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
