import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FeedbackModalComponent } from './feedback-modal.component';

export enum PROPERTIES {
  danger = 'danger',
  success = 'success'
}

export enum MESSAGES {
  error = "Erro ao enviar o formulário. Tente novamente mais tarde.",
  success = "Formulário enviado com sucesso!"
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackModalService {

bsModalRef?: BsModalRef

constructor(private bsModalService: BsModalService) { }

giveFeedBackModal(message: string | MESSAGES, property: string){
  this.bsModalRef = this.bsModalService.show(FeedbackModalComponent)
  this.bsModalRef.content.property = property
  this.bsModalRef.content.message = message
}

getError(message?: string){
  if(message){
    this.giveFeedBackModal(message, PROPERTIES.danger)
  }else{
    this.giveFeedBackModal(MESSAGES.error, PROPERTIES.danger)
  }
  
}

getSuccess(message?: string){
    if(message){
      this.giveFeedBackModal(message, PROPERTIES.danger)
    }else{
      this.giveFeedBackModal(MESSAGES.success, PROPERTIES.success)
    }
  }

}
