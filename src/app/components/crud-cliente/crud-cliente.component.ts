import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {
 //**** */
 cliente: Cliente [] = [];
 filtro: string ="";
 fechaNacimiento="";
 fecha=new Date(this.fechaNacimiento);

//**** */
 departamentos: string[] = [];;
 provincias: string[] = [];;
 distritos: Ubigeo[] = [];;

 
//Json para registrar o actualizar
  Clientes: Cliente = { 
  idCliente:0,
  nombres:"",
  apellidos:"",
  fechaNacimiento: this.fecha,
  dni:"",
  correo:"",
  direccion:"",
  estado:1,
  ubigeo:{
    idUbigeo: -1,
    departamento:"-1",
    provincia:"-1",
    distrito:"-1",
  }
};

//Declaracion de validaciones
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{10,30}')]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
 validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
 validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
 validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
 validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
 validaDireccion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{10,30}')]),
 validaDepartamento: new FormControl('', [Validators.min(1)]),
 validaProvincia: new FormControl('', [Validators.min(1)]),
 validaDistrito: new FormControl('', [Validators.min(1)]),
 validaEstado: new FormControl('', [Validators.min(0)]),
});

//para verificar que e pulsó el boton
submitted = false;


constructor(private ubigeoService:UbigeoService, private clienteService:ClienteService) { 
     this.ubigeoService.listarDepartamento().subscribe(
           (x) => this.departamentos = x
     );
}

cargaProvincia(){
console.log(">>> Carga Provincia >> ");
console.log(">>> Departamento >> " + this.Clientes.ubigeo?.departamento);

this.ubigeoService.listaProvincias(this.Clientes.ubigeo?.departamento).subscribe(
        (x) => this.provincias = x
);

this.Clientes.ubigeo!.provincia = "-1";
this.distritos = [];
this.Clientes.ubigeo!.idUbigeo = -1;

}

cargaDistrito(){
console.log(">>> Carga Distrito >> ");
console.log(">>> Departamento >> " + this.Clientes.ubigeo?.departamento);
console.log(">>> Provincia >> " + this.Clientes.ubigeo?.provincia);

this.ubigeoService.listaDistritos(this.Clientes.ubigeo?.departamento, this.Clientes.ubigeo?.provincia).subscribe(
        (x) => this.distritos = x
  );

this.Clientes.ubigeo!.idUbigeo = -1;
}

ngOnInit(): void {
}

consulta(){

    this.clienteService.listClientes(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.cliente = x
         
    ); console.log(this.cliente);
}

actualizaEstado(aux : Cliente){
      aux.estado = aux.estado == 0? 1 :0;
      this.clienteService.updateClientes(aux).subscribe();
}

registra(){
     this.submitted = true;

      
      

      this.clienteService.registraCliente(this.Clientes).subscribe(
       (x) => {
         document.getElementById("btn_reg_cerrar")?.click();
         Swal.fire('Mensaje', x.mensaje,'success');
              this.clienteService.listClientes(this.filtro==""?"todos":this.filtro).subscribe(
                      (x) => this.cliente = x
              );
            } 
      );

      //limpiar los comobobox
      this.distritos = [];
      this.provincias = [];

      //limpiar los componentes del formulario a través de los ngModel

         this.Clientes = { 
               idCliente:0,
               nombres:"",
               apellidos:"",
               dni:"",
               correo:"",
               direccion:"",
               estado:1,
               ubigeo:{
                 idUbigeo: -1,
                 departamento:"-1",
                 provincia:"-1",
                 distrito:"-1",
              
            }
      }
}

buscar(aux :Cliente){
      this.Clientes  = aux;

      this.ubigeoService.listaProvincias(this.Clientes.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );

    this.ubigeoService.listaDistritos(this.Clientes.ubigeo?.departamento, this.Clientes.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
    );

}


actualiza(){
  this.submitted = true;


  

  this.clienteService.updateClientes(this.Clientes).subscribe(
   (x) => {
     document.getElementById("btn_act_cerrar")?.click();
     Swal.fire('Mensaje', x.mensaje,'success');
          this.clienteService.listClientes(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.cliente = x
          );
        } 
  );

  //limpiar los comobobox
  this.distritos = [];
  this.provincias = [];

  //limpiar los componentes del formulario a través de los ngModel

  this.Clientes = { 
        idCliente:0,
        nombres:"",
        apellidos:"",
        fechaNacimiento:this.fecha,
        dni:"",
        correo:"",
        direccion:"",
        estado:1,
        ubigeo:{
          idUbigeo: -1,
          departamento:"-1",
          provincia:"-1",
          distrito:"-1",
        }
  }
}


elimina(aux :Cliente){
Swal.fire({
     title: '¿Estás Seguro?',
     text: "¡No se puede revertir!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sí, Elimínalo'
}).then((result) => {
   if (result.isConfirmed) {
         this.clienteService.deleteClientes(aux.idCliente).subscribe(
           (x) => {
             Swal.fire('Mensaje',x.mensaje, 'success');
             this.clienteService.listClientes(this.filtro==""?"todos":this.filtro).subscribe(
                     (x) => this.cliente = x
             );
    
           } 
         );
   }
})
}



}



 