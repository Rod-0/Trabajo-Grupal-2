import { Running } from 'src/app/models/running.module';
import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { HttpDataService } from '../../services/http-data.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-running-table',
  templateUrl: './running-table.component.html',
  styleUrls: ['./running-table.component.css']
})
export class RunningTableComponent {
  offerData!: Running;
  @ViewChild('offerForm',{static:false})
  offerForm!: NgForm;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'description', 'points', 'businessId', 'actions'];
  isEditMode = false;

  constructor(private httpDataService: HttpDataService,private router: Router, private _snackBar: MatSnackBar){
    this.offerData = {} as Running;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;


  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllRunnings();
  }

  getAllRunnings(){
    this.httpDataService.getListMovie().subscribe((response: any) =>{
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    })
  }

  onSubmit() {
    if(this.offerForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        this.updateOffers()
      }else{
        console.log("create")
        this.addOffer();
      }
      this.cancelEdit();

    }else{
      console.log('invalid');
    }
  }

  cancelEdit(){
    this.isEditMode = false;
    this.offerForm.resetForm();
  }
  //delete
  deleteItem(id:any){
    this.httpDataService.deleteItem(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:any)=>{
        return o.id !== id ? o: false;
      })
    })
    this._snackBar.open('Offer Deleted', 'Close', {
      duration: 2000,

    });

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

  editItem(element:any){
    this.offerData = element;
   this.router.navigateByUrl(`admin/offers/${this.offerData.id}`)
  }

  //update
  updateOffers(){
    this.httpDataService.updateItem(this.offerData.id,this.offerData).subscribe((response:any)=>{
      this.dataSource.data = this.dataSource.data.map((o:any)=>{
        if(o.id === response.id){
          o = response;
        }
        return o;
      })
    })
  }

  new(){
    this.router.navigateByUrl('/admin/offers/new');
  }

}
