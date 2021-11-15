import { DatePipe } from "@angular/common";
import { Dia } from "./dia";

export class Lembrete {
  id!: number;
  nomeRemedio: string;
  hora: string;
  diasSemana: Dia[];

  constructor(nomeRemedio: string, hora: Date, diasSemana: Dia[]){
    this.nomeRemedio = nomeRemedio;
    this.hora = this.formatarData(hora, 'HH:mm');
    this.diasSemana = diasSemana;
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
