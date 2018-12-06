import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAnuncioPage } from './view-anuncio';

@NgModule({
  declarations: [
    ViewAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAnuncioPage),
  ],
})
export class ViewAnuncioPageModule {}
