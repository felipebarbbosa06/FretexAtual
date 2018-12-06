import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    FormsModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule {}
