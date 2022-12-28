import DetalleFactura from "src/detalle_factura/detallefactura.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(type => DetalleFactura,
        detalleFactura => detalleFactura.factura)
    @JoinColumn()
    public detalleFacturas: DetalleFactura[];


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
    public setFecha(nuevaFecha: Date) {
        this.fecha = nuevaFecha;
    }
    public setTotal(nuevoTotal: number) {
        this.total = nuevoTotal;
    }
}