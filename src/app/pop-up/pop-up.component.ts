import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @Input() msg: string = "Mensagem pré-definida";

  @Input() class: string = "alert-danger";

  constructor(public modal: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.modal.hide();
  }

}
