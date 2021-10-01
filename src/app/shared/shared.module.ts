import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [SubjectListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SubjectListComponent
  ],
  // AuthService is not tree-shakable
  providers: [
    AuthService
  ]
})
export class SharedModule { }
