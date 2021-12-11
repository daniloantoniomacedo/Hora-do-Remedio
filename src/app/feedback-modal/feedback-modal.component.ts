import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent implements OnInit {

  modalRef: BsModalService;
  
  @Input() property: string = "primary"
  @Input() message: string = "menssagem padrão"
  
  constructor(private modalService: BsModalService) { 
    this.modalRef = modalService
  }

  ngOnInit() {
  }

}
