import { Injectable } from '@angular/core';
import { ContatosModel } from '../../models/contatos.models';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ContactService {

  contatos: ContatosModel[];
  refCollection = 'contatos'
  contato: ContatosModel;

  constructor(
    public service: UtilsService
  ) {
    this.contatos = [];
  }

  public getAll() {
    return this.service.dbFire.collection(this.refCollection).snapshotChanges();
  }

  add() {
    return this.service.dbFire.collection(this.refCollection).add(JSON.parse(JSON.stringify(this.contato)));    
  }

  update() {
    return this.service.dbFire.collection(this.refCollection).doc(this.contato.id).set(JSON.parse(JSON.stringify(this.contato)));
  }

  public uploadAndSave(item: any) {
    /*
     let contact = { $key: item.key, name: item.name, url: '', fullPath: '' };
 
     if (contact.$key) {
       this.save(contact);
     } else {
       let storageRef = this.fb.storage().ref();
       let basePath = '/contacts/' + this.angularFireAuth.auth.currentUser.uid;
       contact.fullPath = basePath + '/' + contact.name + '.png';
       let uploadTask = storageRef.child(contact.fullPath).putString(item.fileToUpload, 'base64');
 
       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot) => {
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log(progress + "% done");
       },
       (error) => {
         console.error(error);
       },
       () => {
         contact.url = uploadTask.snapshot.downloadURL;
         this.save(contact);
       });
     }
 
     */
  }

  public remove(item: any) {
    /*
     return this.items.remove(item.$key)
       .then(() => {
         this.removeFile(item.fullPath)
       });
       */
  }

  public removeFile(fullPath: string) {
    /*
     let storageRef = this.fb.storage().ref();
     storageRef.child(fullPath).delete();
     */
  }
}
