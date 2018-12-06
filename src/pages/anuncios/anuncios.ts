import { tap, last } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AnunciosModel } from '../../models/anuncios/index';
import { UtilsService } from '../../providers/utils/utils.service';
import { ViewAnuncioPage } from '../view-anuncio/view-anuncio';
import { FormAnuncioPage } from '../form-anuncio/form-anuncio';

@IonicPage()
@Component({
  selector: 'page-anuncios',
  templateUrl: 'anuncios.html',
})
export class AnunciosPage implements OnInit {

  type = 'FRETE';
  anuncios: AnunciosModel[]
  lastVisible = null;


  constructor(
    public navCtrl: NavController,
    public userService: UserProvider,
    public service: UtilsService,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.anuncios = [];
  }
  
  showAnuncio(item:any) {
    this.navCtrl.push(FormAnuncioPage, {ver:item})
    }

  ngOnInit() {
    
  }

  changeType(type) {
    this.type = type;
    if (type == 'ANUNCIO' && this.anuncios.length == 0) {
      this.listAnuncios();
    }
  }

  showFAB() {
    if (this.userService.user.fretista) {
      return true
    } else {
      if (this.type == 'ANUNCIO') return true
    }
  }

  addFAB() {
    if (this.type == 'ANUNCIO') {
      this.addAnuncio();
    }
  }

  addAnuncio() {
    const state = { new: true, anuncio: null }
    let modalAnuncio = this.modalCtrl.create('FormAnuncioPage', { state }, { showBackdrop: true, enableBackdropDismiss: false });
    modalAnuncio.present();
    modalAnuncio.onDidDismiss(data => {
      if (data) {
        this.getMore()
      }

      
    });
  }

  listAnuncios() {
    const loading = this.service.createLoading('Carregando anúncios...')
    if (this.userService.user.fretista) {
      this.service.dbFire.collection('anuncios', ref => {
        return ref
          .orderBy('data', 'desc')
          .limit(5)
      })
        .snapshotChanges()
        .pipe(
          tap(snap => {
            this.anuncios = [];
            snap.map(doc => {
              const result = doc.payload.doc.data() as AnunciosModel
              this.anuncios = [...this.anuncios, result];
              this.lastVisible = doc.payload.doc.ref;
            })
          })
        )
        .subscribe(
          data => {
            loading.dismiss()
          }, 
          err => {
            console.log(err);
            this.service.alert('Erro ao carregar anúncios', 'error')            
            loading.dismiss()
          }
        )
    }
  }


  getMore() {
    const loading = this.service.createLoading('Carregando anúncios...')
    if (this.userService.user.fretista) {
      this.service.dbFire.collection('anuncios', ref => {
        return ref
          .orderBy('data', 'desc')
          .startAfter(this.lastVisible)
          .limit(5)
      })
        .snapshotChanges()
        .pipe(
          tap(snap => {
            this.anuncios = [];
            snap.map(doc => {
              const result = doc.payload.doc.data() as AnunciosModel
              this.anuncios = [...this.anuncios, result];
              this.lastVisible = doc.payload.doc.ref;
            })
          })
        )
        .subscribe(
          data => {
            loading.dismiss()
          }, 
          err => {
            console.log(err);
            this.service.alert('Erro ao carregar anúncios', 'error')            
            loading.dismiss()
          }
          
        )
         
        
        }
    }
    
  }


