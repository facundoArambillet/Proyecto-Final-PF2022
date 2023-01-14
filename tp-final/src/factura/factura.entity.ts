import { Muro } from "src/muro/muro.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("factura")
export class Factura {
    @PrimaryGeneratedColumn()
    private idFactura : number;

    @Column()
    private fecha : Date
    @Column()
    private total : number;
    @Column()
    private usuarioIdUsuario: number;


    @ManyToOne(type => Usuario,
        usuario => usuario.facturas)
    @JoinColumn()
    public usuario: Usuario;

    //NO ENTIENDO PORQUE TUVE QUE CAMBIAR LA SINTAXIS DE LA RELACION Y COMENTARLA EN MURO.ENTITY
    @ManyToMany(() => Muro)
    @JoinTable()
    public muros : Muro[];


    constructor(fecha : Date, total: number, idUsuario: number) {
        this.fecha = fecha;
        this.total = total;
        this.usuarioIdUsuario = idUsuario;
    }

    public getID(): number {
        return this.idFactura;
    }
    public getFecha(): Date {
        return this.fecha;
    }
    public getTotal(): number {
        return this.total;
    }
    public setFecha(nuevaFecha: Date): void {
        this.fecha = nuevaFecha;
    }
    public setTotal(nuevoTotal: number): void {
        this.total = nuevoTotal;
    }
    public setMuros(nuevosMuros : Muro[]) {
        this.muros = nuevosMuros;
    }
}