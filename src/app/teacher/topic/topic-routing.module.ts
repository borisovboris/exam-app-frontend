import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicEditComponent } from './topic-edit/topic-edit.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'add', component: AddTopicComponent },
    { path: ':topic-id/edit', component: TopicEditComponent },
    { path: ':topic-id', component: TopicDetailsComponent },
    { path: '', component: TopicsComponent, pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
