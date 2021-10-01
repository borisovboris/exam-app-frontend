import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/core/models';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  subject$!: Observable<Subject>;
  subjectId: string | null;

  constructor(
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
    ) {
      this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    }

  public ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
  }

}
