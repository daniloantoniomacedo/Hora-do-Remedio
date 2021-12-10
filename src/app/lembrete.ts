import { DatePipe } from "@angular/common";
import { Dia } from "./dia";

export class Lembrete {
  id!: number;
  nomeRemedio: string;
  hora: string;
  dataTermino: string;
  qtdTotal: string;
  qtdDose: string;
  und: string;
  diasSemana: Dia[];

  constructor(nomeRemedio: string, hora: Date, diasSemana: Dia[], dataTermino: string, qtdTotal: string, qtdDose: string, und: string){
    this.nomeRemedio = nomeRemedio;
    this.hora = this.formatarData(hora, 'HH:mm');
    this.diasSemana = diasSemana;
    this.dataTermino = dataTermino;
    this.qtdTotal = qtdTotal;
    this.qtdDose = qtdDose;
    this.und = und;
  }

  formatarData(date: Date, formato: string): string {
    let datepipe: DatePipe = new DatePipe('en-US');
    let dataFormatada: string | null = datepipe.transform(date, formato)
    if(dataFormatada) {
      return dataFormatada;
    }
    return "00:00";
  }
}
