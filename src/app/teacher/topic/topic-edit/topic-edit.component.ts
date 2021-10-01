import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css']
})
export class TopicEditComponent implements OnInit {

  public subjectId: string | null;
  public topicId: string | null;
  public topicEditForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly topicService: TopicService
  ) { 
    this.subjectId = this.route.snapshot.paramMap.get('subject-id');
    this.topicId = this.route.snapshot.paramMap.get('topic-id');
  }

  public ngOnInit(): void {
    this.topicService.getTopic(this.topicId)
    .pipe(take(1))
    .subscribe((topic) => {
        this.topicEditForm.patchValue({ name: topic.name })
    });
  }

  public submit(): void {
    const { name } = this.topicEditForm.value;

    this.topicService.editTopic(this.topicId, name)
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate([`/teacher/subjects/${this.subjectId}/topics`]);
    });
  }

}
