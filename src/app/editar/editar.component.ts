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
    let splitTime: string[] | undefined =  this.splitTime();
    if(splitTime){
      let time: number = 0;
      
      if(tipo == 'hora') time = +splitTime[0];
      if(tipo == 'minuto') time = +splitTime[1];
      
      let limite: number = 0;
     
      if(tipo == 'hora') limite = 23;
      if(tipo == 'minuto') limite = 59;
      
      if(time < limite && time >= 0){
        if(operacao == 'adicionar') ++time;
        if(operacao == 'subtrair') --time;
      }else if(time > limite) {
        time = 0;
      }

      if(tipo == 'hora') this.lembrete.hora = this.ajustarZero(time) + ':' + splitTime[1];
      if(tipo == 'minuto') this.lembrete.hora = splitTime[0] + ':' + this.ajustarZero(time);
      
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
