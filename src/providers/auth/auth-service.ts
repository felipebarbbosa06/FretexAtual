import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { TwitterConnect } from '@ionic-nativ

@Injectable()
export class AuthService {
  
  constructor(
    private angularFireAuth: AngularFireAuth    
    //private googlePlus: GooglePlus, 
    //private facebook: Facebook, 
    //private twitter: TwitterConnect
    ) { }

  signIn(data: any) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signInWithGoogle() {
    /*return this.googlePlus.login({
      'webClientId': '1086196867722-pekt6qimktuhhp86ebv9l6ma31k05h6g.apps.googleusercontent.com',
      'offline': true
    })
      .then(res => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then((user: firebase.User) => {
            // atualizando o profile do usuario
            return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
          });
      });*/
  }

  signInWithFacebook() {
   /* return this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        //https://developers.facebook.com/docs/graph-api/reference/user
        //Ao logar com o facebook o profile do usuario é automaticamente atualizado.
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      });*/
  }

  signInWithTwitter() {
    /*return this.twitter.login()
      .then((res) => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.TwitterAuthProvider.credential(res.token, res.secret));
      });*/
  }

  signOut() {
    return this.angularFireAuth.auth.signOut()   
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
