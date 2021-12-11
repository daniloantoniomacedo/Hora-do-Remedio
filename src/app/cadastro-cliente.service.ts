import { Client } from './client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroClienteService {
  private readonly API: string = `${environment.lembretesUrl}`;

  constructor(private http: HttpClient) {}

  get(): Observable<Client[]> {
    //Para que um observable envolva a saída do método http, utilizei o casting <Client[]>
    return this.http.get<Client[]>(this.API);
  }

  getClientById(clientId: number): Observable<Client[]> {
    //Para que um observable envolva a saída do método http, utilizei o casting <Client[]>
    return this.http.get<Client[]>(`${this.API}/${clientId}`);
  }

  create(clientData: Client): Observable<Client[]> {
    return this.http.post<Client[]>(this.API, clientData);
  }

  delete(clientId: number): Observable<any> {
    return this.http.delete(`${this.API}/${clientId}`);
  }

  edit(clientId: number, alteration: any): Observable<any> {
    return this.http.put(`${this.API}/${clientId}`, alteration);
  }
}
