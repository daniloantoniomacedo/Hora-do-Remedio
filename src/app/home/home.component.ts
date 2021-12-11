import { PopUpComponent } from '../pop-up/pop-up.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Lembrete } from '../lembrete';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  lembretes: Lembrete[] = [];
  
  getLembretesSubscription?: Subscription;

  modal?: BsModalRef;

  carregado: boolean = false;

  constructor(private http: HttpClient, private modalService: BsModalService, private router: Router){}

  ngOnInit(): void {
    this.mostrarCarregando();
    this.getLembretesSubscription = this.getLembretes();
  }

  async mostrarCarregando(){
    await this.delay(2);
    this.carregado = true;
  }

  delay(n: number){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
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

  irParaCadastro(): void {
    this.router.navigate(['cadastrar']);
  }

  irParaUsuario(): void {
    this.router.navigate(['usuario']);
  }

  ngOnDestroy(): void {
    this.getLembretesSubscription?.unsubscribe();
  }

}
