import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormAnuncioPage } from './form-anuncio';

@NgModule({
  declarations: [
    FormAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(FormAnuncioPage),
  ],
})
export class FormAnuncioPageModule {}
