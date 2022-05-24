import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  descripcion:string="";

  selCliente:number = -1;
  selTipo:number = -1;

  estado:boolean = true;
  
  fechaCompra :  Date = new Date;
  Cliente: Cliente[]  = [];
  TipoReclamo: TipoReclamo[]  = [];
  
  reclamo: Reclamo[] = [];
  


  constructor(private ReclamoService:ReclamoService,private clienteService:ClienteService,private TipoReclamoService:TipoReclamoService) { 
    this.clienteService.listaCliente().subscribe(
      (x)  => this.Cliente = x  
   
  );    
  this.TipoReclamoService.listaTipoReclamo().subscribe(
    (x)  => this.TipoReclamo = x      
);
  }

consultaReclamo(){
  this.ReclamoService.listaReclamo(this.descripcion,this.fechaCompra ,this.selCliente, this.selTipo , this.estado?1:0).subscribe(
        (x) => {
            this.reclamo = x.lista;
            alert(x.mensaje);
        }
  );
}


  
  ngOnInit(): void {
  }

}
