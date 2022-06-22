import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';


@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre:string="";
  direccion:string="";
  estado:boolean = true;
  selPais:number = -1;

  paises?:Pais[] = [];

  sede?:Sede = {
    pais:{
      idPais:-1,
      iso:"-1",
      nombre:"-1",
    }
  }

  sedes:Sede[]=[];








  constructor(private paisService:PaisService, private sedeService:SedeService) { 
    console.log(">>> inserta pais >>> Pais >>" + this.sede?.pais?.nombre);
    this.paisService.listaPais().subscribe(
          (x) => this.paises = x
    );
  }

  consultaSede(){
    this.sedeService.listaSede(this.nombre, this.direccion, this.selPais,this.estado?1 : 0).subscribe(
      (x) => {
          this.sedes = x.lista;
          alert(x.mensaje);
      }

);
  }

  ngOnInit(): void {
  }









}
