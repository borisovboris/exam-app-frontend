import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Session, Subject } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  public subject$!: Observable<Subject>;
  public sessions$!: Observable<Array<Session>>;
  public subjectId!: string | null;

  constructor
  (
    private readonly route: ActivatedRoute,
    private readonly subjectService: SubjectService
  ) {
      this.subjectId = this.route.snapshot.paramMap.get('subject-id');
   }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.sessions$ = this.subjectService.getSubjectSessions(this.subjectId).pipe(shareReplay());
  }

}
