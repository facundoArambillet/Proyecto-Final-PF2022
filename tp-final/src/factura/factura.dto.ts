import { Muro } from "src/muro/muro.entity";

export default class FacturaDTO {
    readonly fecha : Date;
    readonly total : number;
    readonly usuarioIdUsuario: number;
    readonly idsMuros : number[];
}