import { Muro } from "src/muro/muro.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("carritodecompras")
export class CarritoCompras {
    @PrimaryGeneratedColumn()
    private idCarritoDeCompras : number;

    @Column()
    private precioTotal : number;
    @Column()
    private cantidad : number;
    @Column()
    private usuarioIdUsuario : number;
    @Column()
    private muroIdMuro : number;

    @ManyToOne(type => Usuario,
        usuario => usuario.carritosCompras)
    @JoinColumn()
    public usuario: Usuario;

    @ManyToOne(type => Muro,
        muro => muro.carritosCompras)
    @JoinTable()
    public muro: Muro;

    constructor( precioTotal: number,cantidad: number, idUsuario: number , idMuro : number) {
        this.precioTotal = precioTotal;
        this.cantidad = cantidad;
        this.usuarioIdUsuario = idUsuario;
        this.muroIdMuro = idMuro;
    }

    public getID(): number {
        return this.idCarritoDeCompras;
    }

    public getPrecioTotal(): number {
        return this.precioTotal;
    }
    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(nuevaCantidad: number): void {
        this.cantidad = nuevaCantidad;
    }

}