import { Pais } from "./pais.model";

export class Sede {
    idSede?:number;
    nombre?:string;
    direccion?:string;

    fechaCreacion?:Date;

    codigoPostal?:string;
    pais?:Pais;
}
