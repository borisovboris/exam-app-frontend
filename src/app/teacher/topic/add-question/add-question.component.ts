import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuestionType } from 'src/app/core/models';
import { QuestionTypeService } from '../../services/question-type.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public questionForm: FormGroup = this.createForm();
  public topicId: string | null;
  public questionTypes$!: Observable<Array<QuestionType>>;
  @Output() public newQuestionEvent = new EventEmitter<void>();

  constructor
  (
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly questionService: QuestionService,
    private readonly questionTypeService: QuestionTypeService
  ) { 
    this.topicId = this.route.snapshot.paramMap.get('topic-id');
  }

  ngOnInit() {
    this.questionTypes$ = this.questionTypeService.getQuestionTypes();
  }

  public createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      maxPoints: ['', [Validators.required]],
      choices: this.fb.array([])
    });
  }

  get choicesControls(): Array<AbstractControl> {
    return (this.questionForm.get("choices") as FormArray).controls;
  }

  public choices(): FormArray {
    return (this.questionForm.get("choices") as FormArray)
  }

  public createChoice(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required]],
      isCorrect: [false]
    })
  }
  
  public addChoice(): void {
    if(this.choices().length >= 5) {
      return;
    }
    this.choices().push(this.createChoice());
  }

  public removeChoice(index: number) {
    this.choices().removeAt(index);
  }

  public submitQuestion(): void {
    /*
    1. A closed question must have at least 2 choices.
    2. A closed question must have at least 1 correct choice.
    */
    let question = {};
    const formValue = this.questionForm.value;
    const questionType = formValue.type;

    if(questionType === 'open') {
      this.questionForm.removeControl('choices');
    }

    if(this.questionForm.invalid) {
        return;
    }

    if(questionType === 'open') {
      const { title, type, maxPoints } = formValue;
      question = { title, type, topicId: this.topicId, maxPoints }

    } else if (questionType === 'closed') {   
      const { title, type, choices, maxPoints } = formValue;
      const atLeastOneRightChoice = choices.some((choice: any) => choice.isCorrect === true);

      if(choices.length < 2) {
        return;
      } else if (!atLeastOneRightChoice) {
        return;
      }

      question = { title, type, topicId: this.topicId, choices, maxPoints};
    }
    // return; 

    this.questionService.createQuestion(question)
    .pipe(take(1))
    .subscribe(() => {
      //inform parent that a question is created and refresh questions
      this.newQuestionEvent.emit();
      //refresh questionForm
      this.questionForm = this.createForm();
    });
  }

}
