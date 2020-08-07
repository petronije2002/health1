import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgForm } from '@angular/forms'
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Registration } from '../models/models';
import { Pipe, PipeTransform } from '@angular/core';
import * as XLSX from "xlsx";



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Registration[] = [
  {date_: new Date(), phone_: '231313', email_:"wqewe@weeqw",name_:'WEW ERWEß'}
  
];


@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {


  private registrationsCollection: AngularFirestoreCollection<Registration>
  items: Observable<Registration[]>

  todayDate = new Date()
  startDate :Date 
  choosenDate: string


  form_= new FormGroup({
    date_: new FormControl(null,Validators.required)
  })

  data_


  regs 

  // ref_ = this.srv.db.collection('restaurants').doc(sessionStorage.getItem('restaurantID')).collection('registrations').ref


  constructor(private srv: AuthService){

    this.registrationsCollection = this.srv.db.collection('restaurants').doc(sessionStorage.getItem('restaurantID')).collection<Registration>('registrations');

    this.items = this.registrationsCollection.valueChanges()


  }


  dataSource = new MatTableDataSource<Registration>([]);

  displayedColumns: string[] = ['date_', 'name_', 'email_','phone_'];

  
  ngOnInit(){
    let d=new Date()
    d.setDate(d.getDate()-21)

    this.startDate=d
  }

  testFunction(){

   var d1 = new Date();
   d1.setDate(this.form_.value['date_'].getDate())
   d1.setHours(0,0,0,0)


   var d2= new Date();
   d2.setDate(d1.getDate()+1);
   d2.setHours(0,0,0,0)
   console.log(d1, d2)

   let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2))

   tmp_col.valueChanges().subscribe(rr=>{console.log('RRRRRRR',this.dataSource = new MatTableDataSource<Registration>(rr))})

  
  }

  exportToExcel(){
    
  }
 

}
