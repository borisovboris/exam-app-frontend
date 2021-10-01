import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Subject } from 'src/app/core/models';
import { SubjectService } from 'src/app/teacher/services/subject.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  @Input() public subjects$!: Observable<Array<Subject>>;
  @Output() public refreshSubjectsEvent = new EventEmitter<void>();
  occupation!: string;
  
  constructor
  (
    readonly authService: AuthService,
    private readonly subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.authService.getUserOccupation()
    .pipe(take(1))
    .subscribe((data) => { 
      this.occupation = data.occupation;
    });
  }

  deleteSubject(subjectId: number) {
    this.subjectService.deleteSubject(subjectId)
    .pipe(take(1))
    .subscribe(() => {
      this.refreshSubjectsEvent.emit();
    });
  }

}
