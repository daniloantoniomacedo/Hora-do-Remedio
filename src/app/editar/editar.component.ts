import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiasDaSemana } from '../dias-da-semana';
import { Lembrete } from '../lembrete';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  lembrete!: Lembrete;

  id?: string | null;

  subscription?: Subscription;

  bordaVermelha: boolean = false;

  diasDaSemanaMap = new Map<number, string>([
    [0, DiasDaSemana.Domingo],
    [1, DiasDaSemana.Segunda],
    [2, DiasDaSemana.Terca],
    [3, DiasDaSemana.Quarta],
    [4, DiasDaSemana.Quinta],
    [5, DiasDaSemana.Sexta],
    [6, DiasDaSemana.Sabado]
  ]);

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscription = this.http.get<Lembrete>(environment.lembretesUrl+this.id).subscribe(
      lembrete => this.lembrete = lembrete
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

  setQtdTotal(valor: string | undefined): void {
    if(valor){
      this.lembrete.qtdTotal = valor;
      this.verificarQtd(+valor);
    }
  }

  verificarQtd(valor: number): void {
    if(valor <= 0){
      this.bordaVermelha = true;
      console.log('oi');
      
    }  
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
