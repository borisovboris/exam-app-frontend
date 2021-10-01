import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from '../student/subjects/subjects.component';
import { StudentExamDetailsComponent } from './student-exam-details/student-exam-details.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

const routes: Routes = [{
    path: '', children: [
        { path: ':subject-id/student-exams/:student-exam-id', component: StudentExamDetailsComponent },
        { path: ':subject-id', component: SubjectDetailsComponent },
        { path: '', component: SubjectsComponent, pathMatch: 'full' }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }