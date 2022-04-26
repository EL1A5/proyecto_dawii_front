import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlCliente = AppSettings.API_ENDPOINT+ '/rest/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  constructor(private http:HttpClient) { }



  registraCliente(cliente: Cliente):Observable<any>{
    return this.http.post<any>(baseUrlCliente, cliente);
}

}
  


