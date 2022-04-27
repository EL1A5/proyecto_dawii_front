import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-registra-proveedor',
  templateUrl: './registra-proveedor.component.html',
  styleUrls: ['./registra-proveedor.component.css']
})
export class RegistraProveedorComponent implements OnInit {

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];


  proveedor: Proveedor = {
      ubigeo:{
        idUbigeo:-1,
        departamento:"-1",
        provincia:"-1",
        distrito:"",
      }
  }

  constructor(private ubigeoService:UbigeoService, private proveedorservice:ProveedorService) { 
         this.ubigeoService.listarDepartamento().subscribe(
               (x) => this.departamentos = x
         );
  }

  cargaProvincia(){
    console.log(">>> Carga Provincia >> ");
    console.log(">>> Departamento >> " + this.proveedor.ubigeo?.departamento);
    
    this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
            (x) => this.provincias = x
    );

    this.proveedor.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.proveedor.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito(){
    console.log(">>> Carga Distrito >> ");
    console.log(">>> Departamento >> " + this.proveedor.ubigeo?.departamento);
    console.log(">>> Provincia >> " + this.proveedor.ubigeo?.provincia);

    this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
            (x) => this.distritos = x
      );

    this.proveedor.ubigeo!.idUbigeo = -1;
  }


  insertado(){
        this.proveedorservice.registraProveedor(this.proveedor).subscribe(
          (x) => alert(x.mensaje)
        );
  }

  
 ngOnInit(): void {
 }


}
