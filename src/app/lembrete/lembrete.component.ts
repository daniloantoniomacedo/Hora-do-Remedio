import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiasDaSemana } from '../dias-da-semana';
import { Lembrete } from '../lembrete';

@Component({
  selector: 'lembretes',
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.css']
})
export class LembretesComponent implements OnInit, OnDestroy {

  @Input() lembrete!: Lembrete;

  subscription?: Subscription;

  isShowMenu: boolean = true;

  diasDaSemanaMap = new Map<number, string>([
    [0, DiasDaSemana.Domingo],
    [1, DiasDaSemana.Segunda],
    [2, DiasDaSemana.Terca],
    [3, DiasDaSemana.Quarta],
    [4, DiasDaSemana.Quinta],
    [5, DiasDaSemana.Sexta],
    [6, DiasDaSemana.Sabado]
  ]);

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  showMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }

  excluirLembrete(): void {
    this.http.delete(environment.lembretesUrl+this.lembrete.id).subscribe();
    window.location.reload();
  }

  goToEdit(): void {
    this.router.navigate(['/editar/'+this.lembrete.id]);
  }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe();
  }

}
