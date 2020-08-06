import { DialogComponent } from './../dialog/dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './../auth.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { DeviceUUID } from './../../../node_modules/device-uuid'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
// import {SocialUser ,SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import {urlParameters,tokenRequest, event_} from './../models/models'
import { Subscription } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import * as jwt_decode from 'jwt-decode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;    

  imageUrl:string = ''

  imageUrl1

  name = 'Set iframe source';
  url: string = sessionStorage.getItem('regDomain') + "/registration?restaurantName=" + sessionStorage.getItem('restaurantName') + "&restaurantID=" + sessionStorage.getItem('restaurantID');
  urlSafe: SafeResourceUrl;


  

  parameters: urlParameters = {
    restaurant_id : "",
    table_number: "",
    restaurant_name:""
  }


  myForm: FormGroup = new FormGroup({

    image_: new FormControl(null,Validators.required)
  })

  
  

  
  constructor(
      private route: ActivatedRoute,
      public router: Router,
       public srv: AuthService, 
      
      private dialog: MatDialog,
      public sanitizer: DomSanitizer
      ) { }

  
  ngOnInit(): void {

    

    this.srv.urlDownload.subscribe(link_ => {
      this.imageUrl = link_

      console.log("RECIEVED LINK", link_)
      this.urlSafe= link_
    })


    setTimeout(()=>{
      this.srv.downloadFile()
    },500)
    


    
  }

  
  resetForm(){

  }

  get f(){
    return this.myForm.controls;
  }

  onChange(event_){
    console.log(event_.target.files[0])

    if (event_.target.files.length > 0) {
      const file_ = event_.target.files[0];

      if(Number(file_.size)> 100000){
        console.log('file size', file_.size)
        this.myInputVariable.nativeElement.value = null
        this.myForm.reset()

        return
        // this.myForm.reset()
        // this.myInputVariable.nativeElement.value = null

        
      }



      this.myForm.setValue({
        image_: file_
      });
    }

    this.myForm.valid


    console.log("FORM!!!", this.myForm)


  }

  submit(){
    // const formData = new FormData();
    // formData.append('file', this.myForm.get('image_').value);

    let tmp_file = this.myForm.value['image_']


    const reader = new FileReader();
    reader.readAsDataURL(tmp_file);


    reader.onload = event => {
      this.imageUrl1 = reader.result
      let restID = sessionStorage.getItem('restaurantID')
      let ref1 = this.srv.storage.storage.ref(restID).child('images').child('documentBackground.jpg')

      ref1.putString(this.imageUrl1, 'data_url').then(() =>{
        console.log('Uploaded a data_url string!');
      }
      ).catch(err=>{console.log('there was an error')})
      this.srv.downloadFile()
  }

  this.myForm.reset()
  this.myInputVariable.nativeElement.value = null

  
}



    




}
