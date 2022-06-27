import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/rest/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  listaProveedor():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(baseUrlUtil +"/listaProveedor");
  }

  registraProveedor(proveedor: Proveedor):Observable<any>{
    return this.http.post<any>(baseUrlProveedor, proveedor);
  }

  listaProveedores(razonsocial: string, ruc:string, idUbigeo:number, estado:number){
    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc",ruc).set("idUbigeo",idUbigeo).set("estado",estado);
    return this.http.get<any>(baseUrlProveedor+"/listaProveedorConParametros", {params});
  }

  listaProveedorFiltro(filtro: string): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(baseUrlProveedor + "/listaProveedorPorRazonSocial/" + filtro);
  }

  actualizaProveedor(obj : Proveedor): Observable<any> {
    return this.http.put(baseUrlProveedor + "/actualizaProveedor", obj);
  }

  eliminarProveedor(id: any): Observable<any>{
    return this.http.delete(baseUrlProveedor + "/eliminaProveedor/"+ id);
  }

}