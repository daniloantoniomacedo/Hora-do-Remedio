import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dia } from '../dia';
import { DiasDaSemana } from '../dias-da-semana';
import { Lembrete } from '../lembrete';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  lembrete!: Lembrete;

  id?: string | null;

  subscription?: Subscription;

  nomeRemedio: string = "";

  dataTermino: string = "2021-01-01";

  qtdTotal: number = 1;

  qtdDose: number = 1;

  modal?: BsModalRef;

  diasDaSemanaMap = new Map<number, string>([
    [0, DiasDaSemana.Domingo],
    [1, DiasDaSemana.Segunda],
    [2, DiasDaSemana.Terca],
    [3, DiasDaSemana.Quarta],
    [4, DiasDaSemana.Quinta],
    [5, DiasDaSemana.Sexta],
    [6, DiasDaSemana.Sabado]
  ]);

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscription = this.http.get<Lembrete>(environment.lembretesUrl+this.id).subscribe(
      lembrete => {
        this.lembrete = lembrete;
        this.nomeRemedio = lembrete.nomeRemedio;
        this.dataTermino = lembrete.dataTermino;
        this.qtdTotal = lembrete.qtdTotal;
        this.qtdDose = lembrete.qtdDose;
      }
    );
  }

  splitTime(): string[] | undefined {
    return this.lembrete?.hora.split(':', 2); 
  }

  ajustarZero(time: number): string {
    if(time < 10){
      return '0' + String(time);
    }
    return String(time);
  }

  ajustarHorario(tipo: string, operacao: string): void {
    let splitTime: string[] | undefined | null =  this.splitTime();
    if(splitTime){
      let time: number = 0;
      
      if(tipo == 'hora') time = +splitTime[0];
      if(tipo == 'minuto') time = +splitTime[1];
      
      let limite: number = 0;
     
      if(tipo == 'hora') limite = 23;
      if(tipo == 'minuto') limite = 59;
      
      if(operacao == 'soma'){
        if(time < limite){
          ++time;
        }else {
          time = 0;
        }
      }

      if(operacao == 'subtracao'){
        if(time > 0){
          --time;
        }else {
          time = limite;
        }
      }

      if(tipo == 'hora') this.lembrete.hora = this.ajustarZero(time) + ':' + splitTime[1];
      if(tipo == 'minuto') this.lembrete.hora = splitTime[0] + ':' + this.ajustarZero(time);
      
      splitTime = null;
    }
  }

  selecionarDia(index: number): void {
    let selecionado: boolean = this.lembrete.diasSemana[index].selecionado;
    this.lembrete.diasSemana[index].selecionado = !selecionado;
  }

  openModal(msg: string): void{
    this.modal = this.modalService.show(PopUpComponent);
    this.modal.content.msg = msg;
  }

  existeDiaSelecionado(dias: Dia[]): boolean{
    let count: number = 0;
    dias.forEach(dia => { if(dia.selecionado) ++count });
    if(count > 0) return true;
    return false;
  }

  salvarEdicao(): void {
    
    this.atualizarLembrete();

    if(this.nomeRemedio.length == 0){
      this.openModal("Favor preencher o nome do remédio.");

    }else if(this.lembrete.qtdDose <= 0){
      this.openModal("Quantidade da dose deve ser maior que zero.");

    }else if(this.lembrete.qtdTotal <= 0){
      this.openModal("Quantidade da total deve ser maior que zero.");
    
    }else if(this.lembrete.qtdDose > this.lembrete.qtdTotal){
      this.openModal("Quantidade total deve ser maior que a dose.");

    }else if((new Date(this.lembrete.dataTermino)).getTime() < (new Date()).getTime()){
      this.openModal("Data de término deve ser posterior a data atual.");

    }else if(!this.existeDiaSelecionado(this.lembrete.diasSemana)){
      this.openModal("Selecione pelo menos um dia da semana.");

    }else{
      this.http.put(environment.lembretesUrl+this.id, this.lembrete).subscribe();
      this.retornarHome();
    }

  }

  retornarHome(): void {
    this.router.navigate(['']);
  }

  atualizarLembrete(): void {
    this.lembrete.nomeRemedio = this.nomeRemedio;
    this.lembrete.qtdDose = this.qtdDose;
    this.lembrete.qtdTotal = this.qtdTotal;
    this.lembrete.dataTermino = this.dataTermino;
  }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe();
  }

}
