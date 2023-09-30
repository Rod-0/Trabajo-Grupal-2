import { Component,ViewChild } from '@angular/core';
import { HttpDataService } from '../../services/http-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Running } from 'src/app/models/running.module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent {

  offerData!: Running;
  dataSource = new MatTableDataSource();
  @ViewChild('offerForm',{static:false})
  offerForm!: NgForm;

  constructor(private httpDataService: HttpDataService,private router: Router){
    this.offerData = {} as Running;

  }


 form:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(100)]),
  })



  ngOnInit() {}


  onSubmit() {
    if(this.offerForm.form.valid){
      console.log('valid');
      console.log("create")
      this.addOffer();
    }else{
      console.log('invalid');
    }
  }

  //add
  addOffer(){
    this.httpDataService.createItem(this.offerData).subscribe((response:any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o:any)=>{
        return o;
      })
    })
  }

  

  cancel(){
    this.router.navigateByUrl('/business/offers');
  }

}
