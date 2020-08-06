import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordresset.component.html',
  styleUrls: ['./passwordresset.component.scss']
})
export class PasswordressetComponent implements OnInit {

  constructor(private srv: AuthService, private router: Router) { }

  message_: string = ''

  showMessage: boolean = false

  form_: FormGroup= new FormGroup({
    email: new FormControl(null, [Validators.email,Validators.required])
  })

  ngOnInit(): void {
  }


  submitForm(){

    this.srv.auth.sendPasswordResetEmail(this.form_.value['email']).then(success=>{
      console.log("The link was sent to your email")
      this.message_ = "The link was sent. Please check your e-mail"
      this.showMessage=true

      setTimeout(()=>{
        this.router.navigateByUrl('/home')
      },1000)
    },onreject=>{console.log('Reason', onreject);
      this.message_ = "Wrong e-mail, please try again"

      this.showMessage= true
      
    })

  }

  resetForm(){
    this.form_.reset()
    this.showMessage = false

  }

}
