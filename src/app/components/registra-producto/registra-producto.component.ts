import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {
   marcas:Marca  [ ]= [ ];
   paises:Pais  [ ]= [ ];

   producto:Producto={
     marca:{idMarca:0},
     pais:{idPais:0}
   };

   
  constructor(private marcaService : MarcaService, private paisesService : PaisService ,private productService:ProductoService  ) { 

    this.marcaService.listaMarca().subscribe(
      (x)=>this.marcas=x
    );
    this.paisesService.listaPais().subscribe(
      (x)=>this.paises=x
    );

  }

  registrar(){
    this.productService.registrarProducto(this.producto).subscribe(
      response=>{
        alert(response.mensaje);
      },error=>{
        alert(error);
      }
    );
  }

  ngOnInit(): void {
  }


  //METODOS DE CRUD









}
