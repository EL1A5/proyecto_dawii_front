import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  nombres:string="";
  dni:string="";
  selDepartamento:string = "-1"; 
  selProvincia:string = "-1"; 
  selDistrito:number = -1;
  estado:boolean = true;
  

  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

 
  clientes: Cliente[] = [];

  constructor(private ubigeoService: UbigeoService, private clienteService:ClienteService) { 

    ubigeoService.listarDepartamento().subscribe(
        (x) => this.departamentos = x
    );

  }

  consultaCliente(){
    this.clienteService.listaClientes(this.nombres, this.dni, this.selDistrito, this.estado?1:0).subscribe(
          (x) => {
              this.clientes = x.lista;
              alert(x.mensaje);
          }
    );
}

  cargaProvincia(){
        this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
                (x)  => this.provincias = x      
        );
        this.selProvincia = "-1";
        this.distritos = [];
        this.selDistrito = -1;
  }
  cargaDistrito(){
        this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
                (x)  => this.distritos = x      
        );
        this.selDistrito = -1;
  }


  ngOnInit(): void {}
}