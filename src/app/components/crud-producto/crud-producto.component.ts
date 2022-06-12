import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  //Para la Grilla
  productos: Producto [] = [];
  filtro: string ="";

  //PAISES O MARCA
  paises: Pais[] = [];;
  marcas: Marca[] = [];;

  //Json para registrar o actualizar
   fechavigencia="";
   fehca=new Date(this.fechavigencia);

   
  producto: Producto = { 
    idProducto:0,
    nombre: "",
		serie: "0",
		durabilidad: "",
	
		fechaVigencia : this.fehca,
		precio: 0,
		stock: 0,
	
		estado: 1,
		marca:{idMarca:0} ,
   	pais:{idPais:0}
	
  };




   //para verificar que e pulsó el boton
   submitted = false;

   constructor(private marcaService : MarcaService, private paisesService : PaisService ,private productService:ProductoService  ) { 
    this.marcaService.listaMarca().subscribe(
      (x)=>this.marcas=x
    );
    this.paisesService.listaPais().subscribe(
      (x)=>this.paises=x
    );

  }


  ngOnInit(): void {
  }













  consulta(){
    this.productService.listaProductoFiltro(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.productos = x
    );
}

  actualizaEstado(aux : Producto){
        aux.estado = aux.estado == 0? 1 :0;
        this.productService.actualizaProducto(aux).subscribe();
  }

  buscar(aux :Producto){
    this.producto  = aux;

    this.marcaService.listaMarca().subscribe(
      response =>  this.marcas= response
    );

  this.paisesService.listaPais().subscribe(
    response =>  this.paises= response
  );

}


  registra(){
    this.submitted = true;
    this.producto.estado = 1;
    console.log(" ==> registra ==> nombre ==> " + this.producto.nombre);
    console.log(" ==> registra ==> fecha ==> " + this.producto.fechaVigencia);
    console.log(" ==> registra ==> pais ==> " + this.producto.pais?.nombre);
    console.log(" ==> registra ==> marca ==> " + this.producto.marca?.nombre);
    console.log(this.producto)

    this.productService.registrarProducto(this.producto).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'success');
        this.productService.listaProductoFiltro(this.filtro==""?"todos":this.filtro).subscribe(
          response => this.productos = response
        );

      } 
     );

     this.marcas = [];
     this.paises = [];

        //limpiar los componentes del formulario a través de los ngModel

        this.producto = { 
          idProducto:0,
          nombre: "",
          serie: "",
          durabilidad: "",
        
          fechaVigencia : this.fehca,
          precio: 0,
          stock: 0,
        
          estado: 1,
          marca:{idMarca:0} ,
           pais:{idPais:0}
        }



}





actualiza(){
  this.submitted = true;

 

    this.submitted = false;

    this.productService.actualizaProducto(this.producto).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'success');
        this.productService.listaProductoFiltro(this.filtro==""?"todos":this.filtro).subscribe(
                (x) => this.productos = x
        );

      } 
     );

    //limpiar los comobobox
    this.marcas = [];
    this.paises = [];

    //limpiar los componentes del formulario a través de los ngModel

    this.producto = { 
      idProducto:0,
      nombre: "",
      serie: "",
      durabilidad: "",
    
      fechaVigencia : this.fehca,
      precio: 0,
      stock: 0,
    
      estado: 0,
      marca:{idMarca:0} ,
       pais:{idPais:0}
    }
}




elimina(aux :Producto){
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
            this.productService.eliminaProducto(aux.idProducto).subscribe(
              (x) => {
                Swal.fire('Mensaje',x.mensaje, 'success');
                this.productService.listaProductoFiltro(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.productos = x
                );
       
              } 
            );
      }
  })
}





}
