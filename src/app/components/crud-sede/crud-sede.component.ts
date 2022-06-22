import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  sedes:Sede[]=[];
  filtro: string ="";

  nombre:string="";
  direccion:string="";
  estado:boolean = true;
  selPais:number = -1;

  paises?: Pais[] = [];;


  sede: Sede = {
  idSede:0,
  nombre:"",
  direccion:"",
  estado: 1,
  pais:{
    idPais:-1,
    iso:"-1",
    nombre:"-1",
  }

  };

  //Declaracion de validaciones
formsRegistra = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaDireccion: new FormControl('', [Validators.required,Validators.pattern('^.*(?=.*[0-9])(?=.*[a-zA-ZñÑ\s]).*$')]),
  validaPais: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
validaDireccion: new FormControl('', [Validators.required,Validators.pattern('^.*(?=.*[0-9])(?=.*[a-zA-ZñÑ\s]).*$')]),
validaPais: new FormControl('', [Validators.min(1)]),
validaEstado: new FormControl('', [Validators.min(0)]),
});

//para verificar que e pulsó el boton
submitted = false;

  constructor(private sedeService:SedeService, private paisService:PaisService) {
    this.paisService.listaPais().subscribe(
      response => this.paises = response
  ); 
   }

  ngOnInit(): void {
  }

  consulta(){
    this.sedeService.listaSedeLike(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.sedes = x
    );
}

actualizaEstado(aux : Sede){
      aux.estado = aux.estado == 0? 1 :0;
      this.sedeService.actualizaSede(aux).subscribe();
}


registra(){
  this.submitted = true;

   //finaliza el método si hay un error
   if (this.formsRegistra.invalid){
    return;
   }
   
   this.submitted = false;

   this.sedeService.registraSede(this.sede).subscribe(
         (x) => {
           document.getElementById("btn_reg_cerrar")?.click();
           Swal.fire('Mensaje', x.mensaje,'success');
           this.sedeService.listaSedeLike(this.filtro==""?"todos":this.filtro).subscribe(
                   (x) => this.sedes = x
           );

         } 
   );


   //limpiar los componentes del formulario a través de los ngModel

   this.sede = { 
         idSede:0,
         nombre:"",
         direccion:"",
         estado:1,
         pais:{
          idPais:-1,
          
         }
   }
}


buscar(aux :Sede){
  this.sede  = aux;

}

actualiza(){
  this.submitted = true;
  
  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }
  
  this.submitted = false;
  
  this.sedeService.actualizaSede(this.sede).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          Swal.fire('Mensaje', x.mensaje,'success');
          this.sedeService.listaSedeLike(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.sedes = x
          );
        } 
  );
  

  //limpiar los componentes del formulario a través de los ngModel
  
  this.sede = { 
    idSede:0,
    nombre:"",
    direccion:"",
    estado:1,
    pais:{}
  }
  }

  elimina(aux :Sede){
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
              this.sedeService.eliminaSede(aux.idSede).subscribe(
                (x) => {
                  Swal.fire('Mensaje',x.mensaje, 'success');
                  this.sedeService.listaSedeLike(this.filtro==""?"todos":this.filtro).subscribe(
                          (x) => this.sedes = x
                  );
         
                } 
              );
        }
    })
}





}
