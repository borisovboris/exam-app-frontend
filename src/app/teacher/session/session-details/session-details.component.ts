import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Session, StudentExam } from 'src/app/core/models';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit {

  public session$!: Observable<Session>;
  public studentExams$!: Observable<Array<StudentExam>>;
  public sessionId: string | null;

  constructor
  (
    private route: ActivatedRoute,
    private readonly sessionService: SessionService
  ) { 
    this.sessionId = this.route.snapshot.paramMap.get('session-id');
  }

  public ngOnInit(): void {
    this.session$ = this.sessionService.getSession(this.sessionId);
    this.studentExams$ = this.sessionService.getSessionStudentExams(this.sessionId);
  }

}
