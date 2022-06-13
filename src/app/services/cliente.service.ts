import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlCliente = AppSettings.API_ENDPOINT+ '/rest/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  constructor(private http:HttpClient) { }

  listaCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlUtil+"/listaCliente");
  }

  registraCliente(cliente: Cliente):Observable<any>{
    return this.http.post<any>(baseUrlCliente, cliente);
}
listaClientes(nombres:string, dni:string, idUbigeo:number, estado:number):Observable<any> {
  const params = new HttpParams().set("nombres", nombres).set("dni", dni).set("idUbigeo", idUbigeo).set("estado", estado);  
  return this.http.get<any>(baseUrlCliente + "/listaClienteConParametros", {params});
}

//............crud cliente

listClientes(filtro:string):Observable<Cliente[]> {
  return this.http.get<Cliente[]>(baseUrlCliente + "/listaClientePorNombreLike/"+ filtro);
}  

  updateClientes(obj: Cliente): Observable<any>{
return this.http.put(baseUrlCliente + "/actualizaCliente/", obj);
}
  deleteClientes(id: any): Observable<any>{
  return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id);
}
//.................................

}
  


