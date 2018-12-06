import { UserModel } from './../../models/users/index';
import { UtilsService } from './../../providers/utils/utils.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { Md5 } from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  user = {
    nome: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    },
    email: '',
    telefone: '',
    password: '',
    confirmaPassword: ''
  };

  userFire: UserModel

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public service: UtilsService
  ) {
    this.userFire = new UserModel();    
  }

  createAccount() {
    if (this.user.password == this.user.confirmaPassword) {

      const loading = this.service.createLoading('AGUARDE...')

      const user = {
        email: this.user.email,
        password: Md5.hashStr(this.user.password)
      }

      this.service.httpPostWithToken(this.service.CONST.ENDPOINT.usuarios.create, user).subscribe(
        (data: any) => {
          
          console.log(data);
          
          this.userFire.email = this.user.email;
          this.userFire.endereco = this.user.endereco;
          this.userFire.nome = this.user.nome;
          this.userFire.telefone = this.user.telefone;
          this.userFire.foto = null;
          this.userFire.id = data.body.id;
          
          this.service.dbFire.doc(`${this.service.CONST.COLLECTIONS.usuarios}/${data.body.id}`)
          .set(Object.assign({}, this.userFire))
          .then(data => {
            loading.dismiss();
            this.service.alert('Usuário criado com sucesso', 'success')
            this.navCtrl.setRoot('SigninWithEmailPage');
          })
          .catch(err => {
            loading.dismiss();
            this.service.alert('Erro ao criar usuário.', 'error');
          })

        },
        (error: any) => {
          loading.dismiss();
          console.log(error)          
          if (error.error.err.code == "auth/email-already-exists") {
            this.service.alert('O e-mail digitado já está em uso.', 'error');
          } else if (error.error.err.code == 'auth/invalid-email') {
            this.service.alert('O e-mail digitado não é valido.', 'error');
          } else if (error.error.err.code == 'auth/operation-not-allowed') {
            this.service.alert('Não está habilitado criar usuários.', 'error');
          } else if (error.error.err.code == 'auth/weak-password') {
            this.service.alert('A senha digitada é muito fraca.', 'error');
          }
        }
      )      
    } else {
      this.service.alert('Password diferente', 'error');
    }
  }

}