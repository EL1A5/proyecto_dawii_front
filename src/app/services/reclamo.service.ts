import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ 'util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ 'reclamo';


@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
  insertaRegistra(reclamo: Reclamo) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) {   }

  insertaReclamo(data:Reclamo):Observable<any>{
  
    return this.http.post(baseUrlReclamo, data)

}

}
