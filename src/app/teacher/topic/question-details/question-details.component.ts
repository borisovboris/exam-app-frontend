import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/core/models';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent  {
  @Input() public question!: Question;
  @Output() public closeQuestionDetailsEvent = new EventEmitter<void>();
  @Output() public deleteQuestionEvent = new EventEmitter<number>();
  
  constructor() { }

  public closeQuestionDetails(): void {
    this.closeQuestionDetailsEvent.emit();
  }

  public deleteQuestion(questionId: number): void {
    this.deleteQuestionEvent.emit(questionId);
    this.closeQuestionDetails();
  }

}
