import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {

  reclamo: Reclamo[] = [];
  filtro: string = "";
  fechaCompra = "";
  fecha = new Date(this.fechaCompra);

  Cliente: Cliente[] = [];
  TipoReclamo: TipoReclamo[] = [];

  reclamos: Reclamo = {
    idReclamo: 0,
    descripcion: "",
    fechaCompra: this.fecha,
    estado: 1,
		cliente: {
			idCliente: 0
		},
		tipoReclamo: {
			idTipoReclamo: 0
		}
  };

  submitted = false;

  constructor(private ReclamoService: ReclamoService, private clienteService: ClienteService, private TipoReclamoService: TipoReclamoService) {
    this.clienteService.listaCliente().subscribe(
      (x) => this.Cliente = x
    );
    this.TipoReclamoService.listaTipoReclamo().subscribe(
      (x) => this.TipoReclamo = x
    );
  }

  consulta() {
    this.ReclamoService.listReclamo(this.filtro == "" ? "todos" : this.filtro).subscribe(
      (x) => this.reclamo = x
    );
  }

  actualizaEstado(aux: Reclamo) {
    aux.estado = aux.estado === 0 ? 1 : 0;
    this.ReclamoService.updateReclamo(aux).subscribe();
  }

  registra() {
    this.submitted = true;

    this.ReclamoService.registraReclamo(this.reclamos).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
        this.clienteService.listClientes(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.reclamo = x
        );
        this.consulta()
      }
    );

    //limpiar los comobobox
    this.Cliente = [];
    this.TipoReclamo = [];

    //limpiar los componentes del formulario a través de los ngModel
    this.reclamos = {
      idReclamo: 0,
      descripcion: "",
      fechaCompra: this.fecha,
      estado: 1,
      cliente: {
        idCliente: 0
      },
      tipoReclamo: {
        idTipoReclamo: 0
      }
    }
 
  }

  buscar(aux: Reclamo) {
    this.reclamos = aux;
  }

  actualiza() {
    this.submitted = true;

    this.ReclamoService.updateReclamo(this.reclamos).subscribe(
      (x) => {
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje, 'success');
        this.ReclamoService.listReclamo(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.reclamo = x
        );
      }
    );

    //limpiar los comobobox
    this.Cliente = [];
    this.TipoReclamo = [];

    //limpiar los componentes del formulario a través de los ngModel
    this.reclamos = {
      idReclamo: 0,
      descripcion: "",
      fechaCompra: this.fecha,
      estado: 1,
      cliente: {
        idCliente: 0
      },
      tipoReclamo: {
        idTipoReclamo: 0
      }
    }
  }

  elimina(aux: Reclamo) {
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
        this.ReclamoService.deleteReclamo(aux.idReclamo).subscribe(
          (x) => {
            Swal.fire('Mensaje', x.mensaje, 'success');
            this.ReclamoService.listReclamo(this.filtro == "" ? "todos" : this.filtro).subscribe(
              (x) => this.reclamo = x
            );

          }
        );
      }
    })
  }

  ngOnInit(): void {
  }
}
