import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProducto = AppSettings.API_ENDPOINT+ '/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  registrarProducto(data:Producto):Observable<any>{
    return this.http.post(baseUrlProducto,data)
  }

  listaProducto(nombre:string, serie:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("serie", serie).set("idPais", idPais).set("estado", estado);  
    return this.http.get<any>(baseUrlProducto + "/listaProductosPorFiltros", {params});
 }

}


