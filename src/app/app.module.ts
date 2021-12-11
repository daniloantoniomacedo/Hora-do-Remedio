import { CadastroClienteService } from './cadastro-cliente.service';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LembretesComponent } from './lembrete/lembrete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './editar/editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { InputComponent } from './input/input.component';
import { ErrorMenssageComponent } from './error-menssage/error-menssage.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    AppComponent,
    LembretesComponent,
    PopUpComponent,
    HomeComponent,
    EditarComponent,
    CadastrarComponent,
    UsuarioComponent,
    FeedbackModalComponent,
    InputComponent,
    ErrorMenssageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    RoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [RoutingModule, BsModalService, CadastroClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
