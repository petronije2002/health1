import { LoginComponent } from './login/login.component';

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { WelcomeComponent } from './welcome/welcome.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import {MaterialModule} from './material/material.module'
// import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
// import {DBService} from './db.service'
import { QRCodeModule } from 'angularx-qrcode';

import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { DialogComponent } from './dialog/dialog.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ScrollToBottomDirective } from './customDirectives/scrollDerictive.directive';
import { PasswordressetComponent } from './passwordresset/passwordresset.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RegistrationsComponent } from './registrations/registrations.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    QrGenComponent,
    DialogComponent,
    LoginComponent,
    ScrollToBottomDirective,
    PasswordressetComponent,
    PromotionComponent,
    RegistrationsComponent



  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    RouterModule,
    QRCodeModule,
    HammerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    
   
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }
      
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})


export class AppModule { }
