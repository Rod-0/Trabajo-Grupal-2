import { Component,ViewChild } from '@angular/core';
import { Running } from 'src/app/models/running.module';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpDataService } from '../../services/http-data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import * as _ from "lodash";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent {
  offerData!: Running;
  dataSource = new MatTableDataSource();
  @ViewChild('offerForm',{static:false})
  offerForm!: NgForm;
  private routeSub!: Subscription; 

  constructor(private httpDataService: HttpDataService,private router: Router,private route: ActivatedRoute){
    this.offerData = {} as Running;
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      
      
    });
  }

  onSubmit() {
    if(this.offerForm.form.valid){
      console.log('valid');
      this.updateOffer()
      

    }else{
      console.log('invalid');
    }
  }

  cancelEdit(){

    this.router.navigateByUrl('business/offers')
  }

  updateOffer(){
    this.httpDataService.updateItem(this.offerData.id,this.offerData).subscribe((response:any)=>{
      this.dataSource.data = this.dataSource.data.map((o:any)=>{
        if(o.id === response.id){
          o = response;
        }
        return o;
      })
      this.router.navigateByUrl('business/offers')
    })
  }



}
