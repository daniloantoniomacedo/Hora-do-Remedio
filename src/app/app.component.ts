import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  domingo: Dia = new Dia(DiasDaSemana.Segunda, false);
  segunda: Dia = new Dia(DiasDaSemana.Terca, true);
  terca: Dia = new Dia(DiasDaSemana.Quarta, false);   
  quarta: Dia = new Dia(DiasDaSemana.Quinta, true); 
  quinta: Dia = new Dia(DiasDaSemana.Quinta, false); 
  sexta: Dia = new Dia(DiasDaSemana.Sexta, true);
  sabado: Dia = new Dia(DiasDaSemana.Sabado, false);

  getSemana(domingo: Dia, segunda: Dia, terca: Dia, quarta: Dia, quinta: Dia, sexta: Dia, sabado: Dia): Dia[] {
    return [domingo, segunda, terca, quarta, quinta, sexta, sabado]
  };

  diasDaSemana = this.getSemana(this.domingo, this.segunda, this.terca, this.quarta, this.quinta, this.sexta, this.sabado);
  
}

enum DiasDaSemana {
  Segunda = 'S',
  Terca = 'T',
  Quarta = 'Q',
  Quinta = 'Q',
  Sexta = 'S',
  Sabado = 'S'
}

class Dia {
  primeiraLetra: DiasDaSemana;
  selecionado: boolean;

  constructor(primeiraLetra: DiasDaSemana, selecionado: boolean){
    this.primeiraLetra = primeiraLetra;
    this.selecionado = selecionado;
  }
}
