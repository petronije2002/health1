// import { WelcomeComponent } from './welcome/welcome.component';
import { urlParameters, tokenRequest, event_ } from './models/models';
import { environment } from './../environments/environment';
import { Injectable, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, Subscription } from 'rxjs';
// import { SocialAuthService } from 'angularx-social-login';
import { DeviceUUID } from './../../node_modules/device-uuid'
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthGuard, hasCustomClaim, customClaims } from '@angular/fire/auth-guard';

import { pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Route } from '@angular/compiler/src/core';


// const adminRole = () => { return hasCustomClaim('role') };
// const adminRole = () => pipe(customClaims, map(claims => claims.role === "admin"));

@Injectable({
  providedIn: 'root'
})



export class AuthService implements OnInit {

  public logEmitter = new Subject<event_>()

  public ifDocument = new Subject<boolean>()

  public urlDownload = new Subject<string>()

  public tokenSubscription : Subscription

  public parametersSubscription : Subscription

  public documentSubscription : Subscription


  public isAdmin: boolean = false
  public isLogged: boolean = false

  public initials: string = ''

  public userName: string = 'visitor'

  public restaurantName : string = ''



  public customToken: string =''

  public tmp_id = new DeviceUUID().get()

  constructor(private route: ActivatedRoute,
    private router: Router,
    private hhtp: HttpClient,
    public db: AngularFirestore,
    public auth: AngularFireAuth,
    private dialog: MatDialog,
    public storage: AngularFireStorage
  ) { 


    this.auth.onIdTokenChanged((usr)=>{
      usr.getIdToken(true).then(ee=>{console.log('refreshed')})

    },error=>{console.log('Expired?, please check it', error);
      this.signOut()
    })

    


    this.auth.onAuthStateChanged((usr)=>{
      if(usr){

        console.log(usr.refreshToken)

        console.log("USER IS LOGGED IN")
      }else{
        console.log("USER IS SIGNED OUT")
      }
    },error=>{console.log("LOGIN ERROR", error)})


    this.auth.user.subscribe(usr=>{


      if(usr){usr.getIdToken().then(tok1=>{

        let tmp_dec = jwt_decode(tok1)


        if(tmp_dec.role=='admin' || tmp_dec.role=='owner'){

          this.isAdmin = true
          this.isLogged = true
        }else{
          this.isAdmin = false
          this.isLogged = true

        }

        sessionStorage.setItem('restaurantName', tmp_dec.restaurantName)
        sessionStorage.setItem('restaurantID',tmp_dec.restaurantID)
        sessionStorage.setItem('restaurantName',tmp_dec.restaurantName)
        sessionStorage.setItem('role',tmp_dec.role)
        sessionStorage.setItem('userName',tmp_dec.userName)
        sessionStorage.setItem('regDomain',tmp_dec.regDomain)


        this.userName = tmp_dec.userName
        this.initials = this.userName.split(" ").map((n)=>n[0]).join(".")

        this.restaurantName = tmp_dec.restaurantName


        console.log("UNANME", tmp_dec.userName)



       

        console.log(jwt_decode(tok1))
      })}

     })

  }
  
  openDialog(text_?: string,) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: text_,

    };

    this.dialog.open(DialogComponent, dialogConfig);
  }

  receiveCustomTokenFromUsernamePassowrd(username_,password_){
    let tmp_token_req = {
      username: username_,
      password: password_  
    }
    return this.hhtp.post<string>(environment.backendURL + '/signInUser', tmp_token_req)
  }


  loginWithCustomToken(costomToken_){

    this.auth.signInWithCustomToken(costomToken_).then(usr => {

      let decoded_ = jwt_decode(costomToken_)
      this.userName = decoded_.claims.userName

      this.initials = this.userName.split(" ").map((n)=>n[0]).join(".")

      sessionStorage.setItem('restaurantID',decoded_.claims.restaurantID)
      sessionStorage.setItem('restaurantName',decoded_.claims.restaurantName)
      sessionStorage.setItem('role',decoded_.claims.role)
      sessionStorage.setItem('userName',decoded_.claims.userName)
      sessionStorage.setItem('regDomain',decoded_.claims.regDomain)

      this.restaurantName = decoded_.claims.restaurantName
      
      if(decoded_.claims.role==='admin' || decoded_.claims.role=='owner'){

        this.isAdmin = true
      }

      this.isLogged = true
     

    })
  }

  
  ngOnInit() {}


  downloadFile(){

    this.auth.currentUser.then(usr => {usr.getIdToken(true)

    let restID = sessionStorage.getItem('restaurantID')

    // let ref1 = this.storage.storage.ref(restID).child('images').child('document.png')

    setTimeout(()=>{

      let ref1 = this.storage.storage.ref(restID).child('images').child('documentBackground.jpg')

      ref1.getDownloadURL().then((url_)=>{console.log("you can download",url_);
      
      this.urlDownload.next(url_)
      });

      


    },500)
  })
  }



  signOut() {

    this.isAdmin=false
    this.isLogged = false
    this.restaurantName=''
    this.auth.signOut()

    sessionStorage.clear()

    this.router.navigateByUrl('/home')
    
    

  }








}




