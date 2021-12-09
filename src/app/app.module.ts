import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LembretesComponent } from './lembrete/lembrete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LembretesComponent,
    PopUpComponent,
    HomeComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    RoutingModule
  ],
  providers: [RoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
