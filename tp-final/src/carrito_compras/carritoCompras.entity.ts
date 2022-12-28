import { Muro } from "src/muro/muro.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("carritodecompras")
export class CarritoCompras {
    @PrimaryGeneratedColumn()
    private idCarritoDeCompras : number;

    @Column()
    private precioTotal : number;
    @Column()
    private usuarioIdUsuario : number;

    @ManyToOne(type => Usuario,
        usuario => usuario.carritosCompras)
    @JoinColumn()
    public usuario: Usuario;

    @ManyToMany(type => Muro,
        muro => muro.carritosCompras)
    @JoinTable()
    public muros: Muro[];

    constructor( precioTotal: number, idUsuario: number) {
        this.precioTotal = precioTotal;
        this.usuarioIdUsuario = idUsuario;
    }

    public getID(): number {
        return this.idCarritoDeCompras;
    }

    public getPrecioTotal(): number {
        return this.precioTotal;
    }

}