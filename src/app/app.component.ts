import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Lembrete } from './lembrete';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  lembretes: Lembrete[] = [];
  
  getLembretesSubscription?: Subscription

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getLembretesSubscription = this.getLembretes().subscribe(lembretes => this.lembretes = lembretes);
  }

  getLembretes(): Observable<Lembrete[]> {
    return this.http.get<Lembrete[]>(environment.lembretesUrl)
  }

  reloadLembretes(){
    this.lembretes = [];
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.getLembretesSubscription?.unsubscribe();
  }

}
