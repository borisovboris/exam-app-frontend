import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Student } from 'src/app/core/models';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnDestroy {
  @ViewChild('input') public input!: ElementRef;

  public inputSubscription!: Subscription;
  public students$!: Observable<Array<Student>>;
  public subjectId: string | null;
  public selectedStudent!: Student | null;
  @Output() public newStudentEvent = new EventEmitter<void>();


  constructor(
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public ngAfterViewInit() {
    this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup')
    .subscribe(() => {
      const criterion = this.input.nativeElement.value;
      this.students$ = this.subjectService.searchStudents(this.subjectId, criterion);
    });
  }

  public selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  public deselectStudent(): void {
    this.selectedStudent = null;
  }

  public submitStudent(): void {

    if(!this.selectedStudent) { 
      return;
    }

    this.subjectService.addStudentToSubject(this.subjectId, this.selectedStudent.id).subscribe(data => {
      this.selectedStudent = null;
      this.newStudentEvent.emit();
    });

  }

  public ngOnDestroy() {
    this.inputSubscription!.unsubscribe();
  }
}
