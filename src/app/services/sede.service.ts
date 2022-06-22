import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  insertaSede(sede:any): Observable<any>{
    return this.http.post(baseUrlSede, sede);
  }

  listaSede(nombre:string, direccion:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("direccion", direccion).set("idPais", idPais).set("estado", estado);
    return this.http.get<any>(baseUrlSede + "/listaSedeConParametros", {params});
  }



  /*==========================================CRUD SEDE========================================== */


  listaSedeLike(filtro:string):Observable<Sede[]> {
    return this.http.get<Sede[]>(baseUrlSede + "/listaSedePorNombreLike/"+ filtro);
}  

registraSede(obj: Sede): Observable<any>{
    return this.http.post(baseUrlSede+ "/registraSede", obj);
}

actualizaSede(obj: Sede): Observable<any>{
  return this.http.put(baseUrlSede + "/actualizaSede", obj);
}

eliminaSede(id: any): Observable<any>{
  return this.http.delete(baseUrlSede + "/eliminaSede/" + id);


}
}
