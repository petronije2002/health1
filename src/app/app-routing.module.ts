import { RegistrationsComponent } from './registrations/registrations.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PasswordressetComponent } from './passwordresset/passwordresset.component';
import { LoginComponent } from './login/login.component';
import { QrGenComponent } from './qr-gen/qr-gen.component';
import { HomeComponent } from './home/home.component';
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { customClaims, AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

const ownerRole = () => pipe(customClaims, map(claims => claims.role === "owner" || claims.role==="admin" ));


const routes: Routes = [{path: 'home', component: HomeComponent},
                        {path: 'qrgen', component: QrGenComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: ownerRole}},
                        {path: 'passwordresset', component: PasswordressetComponent},
                        {path: 'promotion', component: PromotionComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: ownerRole}},
                        {path: 'registration', component: RegistrationsComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: ownerRole}},

                        {path: 'login', component: LoginComponent},
                        {path: '', component: HomeComponent}
                        ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
