import { PopUpComponent } from './pop-up/pop-up.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Lembrete } from './lembrete';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  lembretes: Lembrete[] = [];
  
  getLembretesSubscription?: Subscription;

  modal?: BsModalRef;

  constructor(private http: HttpClient, private modalService: BsModalService){}

  ngOnInit(): void {
    this.getLembretesSubscription = this.getLembretes();
  }

  getLembretes(): Subscription {
    return this.http.get<Lembrete[]>(environment.lembretesUrl).subscribe(lembretes => this.lembretes = lembretes);
  }

  testarConexao(){
    this.getLembretesSubscription = this.getLembretes();
    if(this.lembretes.length == 0){
      this.modal = this.modalService.show(PopUpComponent);
      this.modal.content.msg = "Erro ao conectar o servidor! Tente novamente mais tarde."
    }
  }

  ngOnDestroy(): void {
    this.getLembretesSubscription?.unsubscribe();
  }

}
