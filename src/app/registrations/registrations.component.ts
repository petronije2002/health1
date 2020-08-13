import { map, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgForm } from '@angular/forms'
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Registration } from '../models/models';

import * as XLSX from "xlsx";

import { CdkTableExporterModule } from 'cdk-table-exporter';



@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit, AfterViewInit  {

  @ViewChild('picker') picker: MatDatepicker<Date>


  @ViewChild('table') table: ElementRef;


  


  private registrationsCollection: AngularFirestoreCollection<Registration>
  items: Observable<Registration[]>

  todayDate = new Date()
  startDate :Date 
  choosenDate: string

  showButton: boolean = false

  totalDocs: number = 0
  pageSize:number =2
  pageIndex :number = 0
  previousIndex : number = 0
  pageSizeOptions = [1,2,5,10,25]

  theLastOneIndex

  tmp_first_seen 
  tmp_last_seen 



  form_= new FormGroup({
    date_: new FormControl(null,Validators.required)
  })

  data_


  regs 

  // ref_ = this.srv.db.collection('restaurants').doc(sessionStorage.getItem('restaurantID')).collection('registrations').ref


  constructor(private srv: AuthService){

    this.registrationsCollection = this.srv.db.collection('restaurants').doc(sessionStorage.getItem('restaurantID')).collection<Registration>('registrations');

    // this.registrationsCollection.valueChanges().subscribe(res=>{ this.totalDocs =  res.entries.length})
    
  }



  

  dataSource = new MatTableDataSource<Registration>([]);

  displayedColumns: string[] = ['date_', 'name_', 'email_','phone_'];

  ngAfterViewInit(){


    setTimeout(()=>{
      this.picker. select(new Date())
    },500)



  }

  ngOnInit(){
    let d=new Date()
    d.setDate(d.getDate()-21)

    this.startDate=d



  }

  exportexcel1(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('tableTable'); 

       let tmp_export_date = []

       this.dataSource.data.forEach(el=>{

        let tmp_date = new Date(el.date_['seconds']*1000)
        var h = tmp_date.getHours().toString();
        var m = tmp_date.getMinutes().toString();
        var s = tmp_date.getSeconds().toString();
        let tmp_hours = h + ":" + m + ":" + s
        // new Date(el.date_.getSeconds).toDateString();

        delete el['date_']
        delete el['uuid_']

        // console.log("SEE IT", tmp_date.toLocaleString() )

        el['date'] = tmp_date.toLocaleString() 



        tmp_export_date.push(el)


       })

       
         
       

       const workSheet = XLSX.utils.json_to_sheet(tmp_export_date);

      // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'testing.xlsx');


       this.form_.reset()

       this.dataSource.data = []
			
    }

  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
}

  testFunction(){

   var d1 = new Date();
   d1.setDate(this.form_.value['date_'].getDate())
   d1.setHours(0,0,0,0)


   var d2= new Date();
   d2.setDate(d1.getDate()+1);
   d2.setHours(0,0,0,0)
   console.log(d1, d2)

  let tmp_data_source : Registration[] = []
  this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2)).valueChanges().subscribe(res=>{
   this.totalDocs= res.length})
  
  //  let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').limit(this.pageSize))

  //  tmp_col.snapshotChanges().subscribe(res=>{
    
  //   this.theLastOneIndex = res[res.length-1].payload.doc
  //   console.log("THE last one", this.theLastOneIndex)
  //    res.forEach((el)=>{
  //     tmp_data_source.push(el.payload.doc.data())
  //     this.dataSource = new MatTableDataSource<Registration>(tmp_data_source)

       
  //   });

  // })
  //  tmp_col.get().subscribe(re=>{
  //   this.theLastOneIndex = re.docs[re.docs.length -1]
  //  })

  //  let tmp_col1 = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').limit(this.pageSize))

  //  tmp_col1.valueChanges().subscribe(rr=>{this.dataSource = new MatTableDataSource<Registration>(rr)})

  //  let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2))

  //  tmp_col.valueChanges().subscribe(rr=>{console.log('RRRRRRR',this.dataSource = new MatTableDataSource<Registration>(rr)); this.totalDocs = rr.length})

  
  this.reloadPage()
  
  }

  exportToExcel(){
    
  }



  reloadPage(event_?){
    console.log("?THE EVENT", event_)
    if(typeof event_!=='undefined'){
      this.previousIndex = event_.previousPageIndex
      this.pageIndex = event_.pageIndex
      this.pageSize  = event_.pageSize

      if(this.pageIndex === this.previousIndex){

        var d1 = new Date();
        d1.setDate(this.form_.value['date_'].getDate())
        d1.setHours(0,0,0,0)

        var d2= new Date();
        d2.setDate(d1.getDate()+1);
        d2.setHours(0,0,0,0)
        console.log(d1, d2)

        let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').limit(this.pageSize))
        tmp_col.snapshotChanges().subscribe(res=>{

          this.tmp_first_seen = res[0].payload.doc
          this.tmp_last_seen = res[ res.length -1].payload.doc
  
          let tmp_source: Registration[] = []
  
          res.forEach(el=> {
            tmp_source.push(el.payload.doc.data())
          })
  
          this.dataSource = new MatTableDataSource<Registration>(tmp_source)
  
  
  
  
        })



      }




      if(this.pageIndex > this.previousIndex ){

        console.log("NEXT BUTTON WAS PRESSED")
        var d1 = new Date();
        d1.setDate(this.form_.value['date_'].getDate())
        d1.setHours(0,0,0,0)

        var d2= new Date();
        d2.setDate(d1.getDate()+1);
        d2.setHours(0,0,0,0)
        console.log(d1, d2)

        let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').startAfter(this.tmp_last_seen).limit(this.pageSize))
        tmp_col.snapshotChanges().subscribe(res=>{

          this.tmp_first_seen = res[0].payload.doc
          this.tmp_last_seen = res[ res.length -1].payload.doc
  
          let tmp_source: Registration[] = []
  
          res.forEach(el=> {
            tmp_source.push(el.payload.doc.data())
          })
  
          this.dataSource = new MatTableDataSource<Registration>(tmp_source)
  
  
  
  
        })



      }
      
      if (this.pageIndex < this.previousIndex ){
        console.log("PREV BUTTON WAS PRESSSED")
        console.log("NEXT BUTTON WAS PRESSED")
        var d1 = new Date();
        d1.setDate(this.form_.value['date_'].getDate())
        d1.setHours(0,0,0,0)

        var d2= new Date();
        d2.setDate(d1.getDate()+1);
        d2.setHours(0,0,0,0)
        console.log(d1, d2)

        let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').endBefore(this.tmp_first_seen).limit(this.pageSize))
        tmp_col.snapshotChanges().subscribe(res=>{

          this.tmp_first_seen = res[0].payload.doc
          this.tmp_last_seen = res[ res.length -1].payload.doc
  
          let tmp_source: Registration[] = []
  
          res.forEach(el=> {
            tmp_source.push(el.payload.doc.data())
          })
  
          this.dataSource = new MatTableDataSource<Registration>(tmp_source)
  
  
  
  
        })


      }


    }else{

      var d1 = new Date();
      d1.setDate(this.form_.value['date_'].getDate())
      d1.setHours(0,0,0,0)

      var d2= new Date();
      d2.setDate(d1.getDate()+1);
      d2.setHours(0,0,0,0)
      console.log(d1, d2)

      console.log("NO EVENT TRIGGERED")
      let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').limit(this.pageSize))
      tmp_col.snapshotChanges().subscribe(res=>{

        try{
          this.tmp_first_seen = res[0].payload.doc
          this.tmp_last_seen = res[ res.length -1].payload.doc
  

        }catch{
          // this.tmp_first_seen = res[0].payload.doc
          // this.tmp_last_seen = res[ res.length -1].payload.doc
          console.log("NO DATA")


        }

        
        let tmp_source: Registration[] = []

        res.forEach(el=> {
          tmp_source.push(el.payload.doc.data())
        })

        this.dataSource = new MatTableDataSource<Registration>(tmp_source)




      })
      
      
      // .valueChanges().subscribe(rr=>{this.dataSource = new MatTableDataSource<Registration>(rr)})
    }



    // var d1 = new Date();
    // d1.setDate(this.form_.value['date_'].getDate())
    // d1.setHours(0,0,0,0)

    // var d2= new Date();
    // d2.setDate(d1.getDate()+1);
    // d2.setHours(0,0,0,0)
    // console.log(d1, d2)

    // this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2)).valueChanges().subscribe(res=>{console.log("TOTAL NUMBER",res.length); this.totalDocs= res.length})

  //   let tmp_col2 = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').startAfter(this.theLastOneIndex).limit(this.pageSize))

  //  tmp_col2.get().subscribe(re=>{
  //   this.theLastOneIndex = re.docs[re.docs.length -1]
  //  })

    // let tmp_col = this.srv.db.collection<Registration>(this.registrationsCollection.ref, ref=> ref.where('date_','>=',d1).where('date_','<=',d2).orderBy('date_').startAfter(this.theLastOneIndex).limit(this.pageSize))
    // let tmp_data_source :Registration[] = []
    
    // tmp_col.snapshotChanges().subscribe(res=>{

    
    //   console.log("RES RESULT", res)

    //   try{
    //     this.theLastOneIndex = res[res.length-1].payload.doc


    //   }
    //   catch{
    //     this.theLastOneIndex = null

    //   }
  
    //   // this.theLastOneIndex = res[res.length-1].payload.doc
    //   console.log("THE last one", this.theLastOneIndex)
    //    res.forEach((el)=>{
    //     tmp_data_source.push(el.payload.doc.data())
       
  
         
    //   });

    //   this.dataSource = new MatTableDataSource<Registration>(tmp_data_source)
  
    // })
    
    
    
    
    
    
    
    
    // tmp_col.valueChanges().subscribe(re=>{
      
    // console.log("SNAPSHOT CHANGES", re.docs.length,"DOCS")
    // tmp_col.valueChanges().subscribe(res=>{console.log(res,"URAAA");
      
    // this.dataSource = new MatTableDataSource<Registration>(re)

    // this.theLastOneIndex = res.length
    // console.log("The lase one", this.theLastOneIndex)
    // })
    // console.log(event_)
  }
 

}
