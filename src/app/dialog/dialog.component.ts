import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  description:string;



  constructor(private router: Router,
    private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.title;

       
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
}
navigate(){

  // this should be nagiated to reset password component
  this.router.navigateByUrl('passwordresset')
  this.dialogRef.close();


}

}
