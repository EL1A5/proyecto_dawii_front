import { Component, OnInit } from '@angular/core';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  

  ngOnInit(): void {
  }

  proveedores : Proveedor [] = [];
  filtro: string = "";

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];
  
  proveedor: Proveedor = {
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion:"",
    telefono:"",
    celular:"",
    contacto:"",
    estado:1,
    ubigeo:{
      idUbigeo:-1,
      departamento:"-1",
      provincia:"-1",
      distrito:"",
    }
}


constructor(private ubigeoService: UbigeoService, private proveedorService: ProveedorService) { 
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

consulta(){
  this.proveedorService.listaProveedorFiltro(this.filtro==""?"todos": this.filtro).subscribe(
    (x) => this.proveedores = x
  );
}

registra(){

  this.proveedorService.registraProveedor(this.proveedor).subscribe(
      (x) =>{
          document.getElementById("btn_reg_limpiar")?.click();
          document.getElementById("btn_reg_cerrar")?.click();
          Swal.fire('Mensaje', x.mensaje,'success');

          this.proveedorService.listaProveedorFiltro(this.filtro==""?"todos":this.filtro).subscribe(
            response => this.proveedores = response
          );
      }
  );

  this.distritos = [];
  this.provincias = [];

  this.proveedor = {
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion:"",
    telefono:"",
    celular:"",
    contacto:"",
    estado:1,
    ubigeo:{
      idUbigeo:-1,
      departamento:"-1",
      provincia:"-1",
      distrito:"",
    }
  }
}
// fin metodo registra


actualizaEstado(aux:Proveedor){
  aux.estado = aux.estado == 0?1:0;
  this.proveedorService.actualizaProveedor(aux).subscribe();
}
// fin metodo actualizaEstado


buscar(aux: Proveedor){
  this.proveedor = aux;
  this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
    response => this.provincias = response
  );
  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    response => this.distritos = response
  );
}
// fin metodo buscar


actualiza(){

  this.proveedorService.actualizaProveedor(this.proveedor).subscribe(
    (x) => {
      document.getElementById("btn_reg_limpiar")?.click();
      document.getElementById("btn_act_cerrar")?.click();
      Swal.fire('Mensaje', x.mensaje,'success');
      this.proveedorService.listaProveedorFiltro(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.proveedores = x
      );
    } 
   );

   this.distritos = [];
   this.provincias = [];

   this.proveedor = {
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion:"",
    telefono:"",
    celular:"",
    contacto:"",
    estado:1,
    ubigeo:{
      idUbigeo:-1,
      departamento:"-1",
      provincia:"-1",
      distrito:"",
    }
  }
}
// fin metodo actualiza

elimina(aux: Proveedor){
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¡No se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Elimínalo'
  }).then((result) => {
    if (result.isConfirmed){
      this.proveedorService.eliminarProveedor(aux.idProveedor).subscribe(
        (x) =>{
          Swal.fire("Mensaje", x.mensaje, "success");
          this.proveedorService.listaProveedorFiltro(this.filtro==""?"todos": this.filtro).subscribe(
            (x) => this.proveedores = x
          );
        }
      );
    }
  })
}
// fin metodo eliminar

















}
