import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentExam, Subject } from 'src/app/core/models';
import { SubjectService } from 'src/app/teacher/services/subject.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  public subjectId: string | null;
  public studentExams$!: Observable<Array<StudentExam>>;
  public subject$!: Observable<Subject>;

  constructor
  (
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly subjectService: SubjectService
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  ngOnInit(): void {
    this.subject$ = this.subjectService.getSubject(this.subjectId);
    this.studentExams$ = this.studentService.getSubjectExamsOfStudent(this.subjectId);
  }

}
