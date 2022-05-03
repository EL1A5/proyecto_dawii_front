import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {
 
  TipoReclamo : TipoReclamo[] = [];
  Cliente  : Cliente[] = [];
  reclamo: Reclamo ={
    tipoReclamo:{

      idTipoReclamo: -1
    },

    cliente:{

      idCliente: -1
    }

  };

  constructor(private tipoReclamoService:TipoReclamoService,private ReclamoService:ReclamoService,private clienteService:ClienteService){

    this.tipoReclamoService. listaTipoReclamo().subscribe(
      (x)=> this.TipoReclamo=x
      );
      this.clienteService.listaCliente().subscribe(
        (x)=> this.Cliente=x
    );
  }
 

 insertado(){

  
    this.ReclamoService.insertaReclamo(this.reclamo).subscribe(
     
       (x)=> alert(x.mensaje)
        
    );
   
  }
  
  ngOnInit(): void {
  }

}
