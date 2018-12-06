import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPage } from './usuario';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPage),
    FormsModule
  ],
  exports: [
    UsuarioPage
  ]
})
export class UsuarioPageModule {}
