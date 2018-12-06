
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { CONST } from '../../constants/index';

@Injectable()
export class UtilsService {
  
  CONST = CONST;

  user = {
    uid: null,
    email: null,
    token: null,
  }

  constructor(
    public http: HttpClient,
    public dbFire: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    dbFire.firestore.settings({ timestampsInSnapshots: true })
  }

  uId() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers.append('Authorization', `Bearer ${this.user.token}`);
    return headers;
  }

  httpPostWithToken(endpoint: string, param) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'eQ7Dmx3omSywvyynk9kX');
    return this.http.post(endpoint, param, { headers, observe: 'response' })
  }
  
  httpPost(endpoint: string, param) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(endpoint, param, { headers, observe: 'response' })
  }

  httpPut(endpoint: string, param) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.put(endpoint, param, { headers, observe: 'response' })
  }

  httpDelete(endpoint: string, param?) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.delete(param ? `${endpoint}/${param}` : endpoint, { headers, observe: 'response' })
  }

  httpGet(endpoint: string, param?) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(param ? `${endpoint}/${param}` : endpoint, { headers, observe: 'response' })
  }

  createLoading(mensagem: string): Loading {
    const loading: Loading = this.loadingCtrl.create({
      content: mensagem,
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  alert(msg, css) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: css
    });
    toast.present();
  }

}
