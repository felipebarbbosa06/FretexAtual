import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/user/user';
import { UtilsService } from '../../providers/utils/utils.service';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage  {
  displayName: string;
  imgUrl: string;

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    public userService: UserProvider,
    public service: UtilsService
  ) {
    console.log('usuario', this.userService.user);
    
  }

  saveUser() {
    console.log(this.userService.user);
    const loading = this.service.createLoading('Salvando...')
    this.service.dbFire.doc(`usuarios/${this.userService.user.id}`)
    .set(Object.assign({}, this.userService.user))
    .then(() => {
      loading.dismiss()
      this.service.alert('Dados salvos com sucesso', 'success');
    })
    .catch(err => {
      loading.dismiss()
      this.service.alert('Erro ao salvar seus dados', 'error');
    })
  }

  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.parent.parent.setRoot('SigninPage');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
