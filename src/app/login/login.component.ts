import { DialogComponent } from './../dialog/dialog.component';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style,state } from '@angular/animations'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fading1', [
      // ...
      state('fadeOut', style({
       
        opacity: 0
       
      })),
      state('fadeIn', style({
        
        opacity: 1
        
      })),
      transition('fadeOut => fadeIn', [
        animate('0.5s')
      ]),
      transition('fadeIn => fadeOut', [
        animate('0.5s')
      ])
      
    ]),
  ],
})



export class LoginComponent implements OnInit {

  

  resetPassword: boolean = false

  fading:boolean


  constructor(public srv: AuthService, private router: Router, private dialog: MatDialog ) { }

  form_ = new FormGroup({

    username: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    
    // this.srv.checkIfLogged()

    setTimeout(()=>{
      this.fading=true
    },300)

  }


  
  
  

  submitForm(){

    this.srv.receiveCustomTokenFromUsernamePassowrd(this.form_.value['username'],this.form_.value['password']).subscribe(customToken=>{

      console.log("CustomToken",customToken);
      
      this.srv.loginWithCustomToken(customToken['token'])

      this.router.navigate(['/home'])

    },error=>{console.log("there was an error",error.error.error, typeof error.error.error);
    
      if(String(error.error.error).includes('PASSWORD'))
      {
        console.log("PASSWORD WAS WRONG")
        this.openDialog("Wrong passowrd")
        this.form_.patchValue({'password':null})

       
      }
      if(String(error.error.error).includes('EMAIL')){
        this.openDialog("That accout does not exist")
        this.form_.reset()
      }

      if(String(error.error.error).includes("TOO_MANY_ATTEMPTS_TRY_LATER")){

        alert("Too many unsuccesfull trials. Please try later, again")
      }

        
    // ;  
    // this.form_.disable()
  })
 
  }

  resetForm(){
    this.form_.reset()

  }



  resetPasswordFunction(){
    this.resetPassword=false

    this.router.navigateByUrl('/reset')
  }

  tryAgain(){

    this.resetPassword= false
    this.form_.enable()

    this.form_.reset()
  }

  // matcher = new MyErrorStateMatcher();


  openDialog(text_?:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        
        title: text_
    };

    this.dialog.open(DialogComponent, dialogConfig);
}

}
