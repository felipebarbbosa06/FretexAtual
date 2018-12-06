import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from '../providers/auth/auth-service';
import { ContactService } from '../providers/contact-service/contact-service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UtilsService } from '../providers/utils/utils.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';

const firebaseConfig = {
  apiKey: "AIzaSyB6CY677LBuUOEfNHvRhiZ0mDHvE41jJe8",
  authDomain: "fretex-ee59b.firebaseapp.com",
  databaseURL: "https://fretex-ee59b.firebaseio.com",
  projectId: "fretex-ee59b",
  storageBucket: "fretex-ee59b.appspot.com",
  messagingSenderId: "1086196867722"
};

@NgModule({
  declarations: [
    MyApp,
    ResetpasswordPage,    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ResetpasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ContactService,
    UtilsService,
    ImagePicker,
    UserProvider
  ]
})
export class AppModule {}
