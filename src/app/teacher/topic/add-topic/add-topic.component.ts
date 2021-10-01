import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})

export class AddTopicComponent implements OnInit {
  public subjectId!: string | null;
  public topicForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topicService: TopicService
  ) { }

  public ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
  }

  public submit() {
    if(this.topicForm.invalid) {
      return;
    }
    
    const { name } = this.topicForm.value;

    this.topicService.createTopic(name, this.subjectId)
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate([`/teacher/subjects/${this.subjectId}/topics`]);
    });
  }

}
