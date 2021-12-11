import { UsuarioComponent } from './usuario/usuario.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'editar/:id', component: EditarComponent },
    { path: 'cadastrar', component: CadastrarComponent },
    { path: 'usuario', component: UsuarioComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class RoutingModule { }
