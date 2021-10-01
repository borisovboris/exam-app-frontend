import { Component, OnInit } from '@angular/core';
import { ModalService } from './core/services/modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'exam-app';
  public showModal: boolean = false;
  public modalMessage!: string;

  constructor
  (
    private readonly modalService: ModalService
  ) {}
  
  ngOnInit() {
    this.modalService.currentMessage.subscribe((message) => {
      this.showModal = true;
      this.modalMessage = message;
    });
  }

}


