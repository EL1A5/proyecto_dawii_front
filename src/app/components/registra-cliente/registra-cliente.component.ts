import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css']
})
export class RegistraClienteComponent implements OnInit {
 //
 departamentos: string[] = [];
 provincias: string[] = [];
 distritos: Ubigeo[] = [];

 //
 cliente: Cliente = {
     ubigeo:{
       idUbigeo:-1,
       departamento:"-1",
       provincia:"-1",
       distrito:"",
     }
 }

 constructor(private ubigeoService:UbigeoService, private clienteService:ClienteService) { 
        this.ubigeoService.listarDepartamento().subscribe(
              (x) => this.departamentos = x
        );
 }

 cargaProvincia(){
   console.log(">>> Carga Provincia >> ");
   console.log(">>> Departamento >> " + this.cliente.ubigeo?.departamento);
   
   this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
           (x) => this.provincias = x
   );

   this.cliente.ubigeo!.provincia = "-1";
   this.distritos = [];
   this.cliente.ubigeo!.idUbigeo = -1;

 }

 cargaDistrito(){
   console.log(">>> Carga Distrito >> ");
   console.log(">>> Departamento >> " + this.cliente.ubigeo?.departamento);
   console.log(">>> Provincia >> " + this.cliente.ubigeo?.provincia);

   this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
           (x) => this.distritos = x
     );

   this.cliente.ubigeo!.idUbigeo = -1;
 }


 insertado(){
       this.clienteService.registraCliente(this.cliente).subscribe(
         (x) => alert(x.mensaje)
       );
 }

 ngOnInit(): void {
 }


}

 