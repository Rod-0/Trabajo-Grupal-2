import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { Running } from '../models/running.module';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  base_URL = "http://localhost:3000/offers"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error occured: ${error.status}, body was: ${error.error}`);
    }else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(
      'Something happened with request, try again.'
    );
  }

  getListMovie(): Observable<Running>{
    return this.http.get<Running>(this.base_URL)
    .pipe(retry(2),catchError(this.handleError))
  }

  getItem(id:string):Observable<Running>{
    return this.http.get<Running>(`${this.base_URL}/${id}`)
    .pipe(retry(2),catchError(this.handleError));
  }
  
  updateItem(id:string,item:any):Observable<Running>{
    return this.http.put<Running>(this.base_URL +'/'+ id,JSON.stringify(item),this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }
  createItem(item:any):Observable<Running>{
    return this.http.post<Running>(this.base_URL ,JSON.stringify(item),this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }
  
  deleteItem(id:string):Observable<Running>{
    return this.http.delete<Running>(this.base_URL +'/'+ id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }

}
