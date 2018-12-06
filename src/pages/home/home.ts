import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, Loading } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UtilsService } from '../../providers/utils/utils.service';
import { map, take, tap, first } from 'rxjs/operators';
import { UserModel } from '../../models/users/index';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  contatosRoot = 'ContatosPage'
  usuarioRoot = 'UsuarioPage'
  anuncioRoot = 'AnunciosPage'

  constructor(
    public navCtrl: NavController,
    public userService: UserProvider,
    public service: UtilsService
  ) {

  }

  ngOnInit() {
    const loading = this.service.createLoading('loading');
    this.service.dbFire.doc(`usuarios/${this.userService.user.id}`)
    .snapshotChanges()
    .pipe(
      take(1),
      tap(doc => {
        this.userService.user = doc.payload.data() as UserModel;
        loading.dismiss()
        console.log(this.userService.user);
        
      }))
    .subscribe()
  }

}
