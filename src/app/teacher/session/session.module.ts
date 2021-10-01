import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { StudentExamDetailsComponent } from './student-exam-details/student-exam-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';



@NgModule({
  declarations: [
    SessionsComponent, 
    SessionDetailsComponent, 
    AddSessionComponent, StudentExamDetailsComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatTimepickerModule
  ]
})
export class SessionModule { }
