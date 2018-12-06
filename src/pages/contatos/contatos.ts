import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service/contact-service';
import { ContatosModel } from '../../models/contatos.models';
import { UtilsService } from '../../providers/utils/utils.service';
import { AuthService } from '../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})

export class ContatosPage implements OnInit {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private contactService: ContactService,
    public auth: AuthService
    ) {    
  }

  ngOnInit() {
    this.getAllContatos();
  }

  getAllContatos() {
    this.contactService.getAll().subscribe(contatos => {      
      this.contactService.contatos = [];
      contatos.map(contato => {
        let data = contato.payload.doc.data() as ContatosModel;
        data.id = contato.payload.doc.id;        
        console.log(data);
        this.contactService.contatos = [...this.contactService.contatos, data];
      });
    })
  }

  newContact() {
    this.contactService.contato = new ContatosModel();
    this.navCtrl.push('EditContatosPage');
  }

  editItem(item: ContatosModel) {
    this.contactService.contato = item
    this.navCtrl.push('EditContatosPage');
  }

  removeItem(item: any) {
    this.contactService.remove(item);
  }

  logout() {
    this.auth.signOut()
    .then(data => {
      this.navCtrl.setRoot('SigninPage')
    })
  }

}
