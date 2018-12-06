import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilsService } from '../../providers/utils/utils.service';
import { UserProvider } from '../../providers/user/user';
import { AnunciosModel, AnuncioEnderecoModel } from '../../models/anuncios/index';
import * as moment from 'moment';
moment.locale('pt-br');


@IonicPage()
@Component({
  selector: 'page-form-anuncio',
  templateUrl: 'form-anuncio.html',
})
export class FormAnuncioPage implements OnInit {

  anuncio: AnunciosModel;
  enderecoCadastro = true;
  ver:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public service: UtilsService,
    public userService: UserProvider,
    ) {
      this.anuncio = new AnunciosModel()
      this.anuncio.destino = new AnuncioEnderecoModel()
      console.log('anuncio', this.anuncio);

      
  }

  ngOnInit() {
    const state = this.navParams.get('state')
    console.log('state', state);
    
    if (state.new) {

      this.anuncio.id = this.service.uId();
      this.anuncio.type = 'ANUNCIO';
      this.anuncio.idAnunciante = this.userService.user.id;
      this.anuncio.anunciante = this.userService.user.nome;
      this.anuncio.endereco = this.userService.user.endereco;
      this.anuncio.endereco.bairro = this.userService.user.endereco.bairro;
      this.anuncio.endereco.cep = this.userService.user.endereco.cep;
      this.anuncio.endereco.cidade = this.userService.user.endereco.cidade;
      this.anuncio.endereco.estado = this.userService.user.endereco.estado;
      this.anuncio.endereco.numero = this.userService.user.endereco.numero;
      this.anuncio.endereco.rua = this.userService.user.endereco.rua;
      this.anuncio.foto = null;
      
      const stillUtc = moment.utc(new Date(moment().valueOf())).toDate();   
      this.anuncio.data = new Date(stillUtc)

      console.log(this.anuncio)
       this.enderecoCadastro = true;
       this.changeEndereco()

     // this.anuncio.anuncio = this.userService.user.endereco.numero;
      // this.anuncio.destino =
      // this.anuncio.qualificacao = this.userService.user.qualificacao;
       //this.anuncio.caracteristica = this.userService.user.caracteristica;
       //this.anuncio.preco = this.userService.user.preco;
    } else {
      this.anuncio = state.anuncio;
    }

  }
  
  changeEndereco() {
    console.log('change');
    setTimeout(() => {
      if (!this.enderecoCadastro) {
        this.anuncio.endereco = new AnuncioEnderecoModel(); 
      } else {
        this.anuncio.endereco = this.userService.user.endereco; 
      }      
    }, 150);
    
  }
  
  close() {
    this.viewCtrl.dismiss();
  }
  
  save() {
    const anuncioFire = Object.assign({}, this.anuncio);
    anuncioFire.endereco = Object.assign({}, this.anuncio.endereco);
    anuncioFire.destino = Object.assign({}, this.anuncio.destino);

    const loading = this.service.createLoading('Carregando...');
    this.service.dbFire.doc(`anuncios/${this.anuncio.id}`)
    .set(anuncioFire)
    .then(() => {
      loading.dismiss()
      this.viewCtrl.dismiss(true)
    })
    .catch(err => {
      loading.dismiss()
      this.service.alert('Erro ao salvar anúncio', 'error');
    })
  }

}
