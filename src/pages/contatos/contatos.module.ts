import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { ContatosPage } from './contatos';


@IonicPage()

@NgModule({
  declarations: [
    ContatosPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatosPage),
  ]
})
export class ContatosPageModule {}
