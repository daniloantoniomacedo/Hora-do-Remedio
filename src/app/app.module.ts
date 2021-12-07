import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LembretesComponent } from './lembrete/lembrete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CadastrarEditarLembreteComponent } from './cadastrar-editar-lembrete/cadastrar-editar-lembrete.component';

@NgModule({
  declarations: [
    AppComponent,
    LembretesComponent,
    PopUpComponent,
    CadastrarEditarLembreteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
