import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {



  nombre:string="";
  serie:string="";
  selPais:number = -1; 
  estado:boolean = true;
  
  marcas:Marca  [ ]= [ ];
  paises:Pais  [ ]= [ ];


  productos: Producto[] = [];

  constructor(private  marcaService : MarcaService,paisService: PaisService, private productoservice:ProductoService) { 
    this.marcaService.listaMarca().subscribe(
      (x)=>this.marcas=x
    );
    paisService.listaPais().subscribe(
        (x) => this.paises = x
    );

  }

  consultaProducto(){
    this.productoservice.listaProducto(this.nombre, this.serie, this.selPais, this.estado?1:0).subscribe(
          (x) => {
              this.productos = x.lista;
             
          }
    );
}

  ngOnInit(): void {
  }

}
