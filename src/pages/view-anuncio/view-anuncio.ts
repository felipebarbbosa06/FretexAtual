import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-view-anuncio',
  templateUrl: 'view-anuncio.html',
})
export class ViewAnuncioPage {
  ver: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ver = this.navParams.get('ver');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAnuncioPage');
  }

}
