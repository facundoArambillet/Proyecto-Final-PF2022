import { Factura } from "src/factura/factura.entity";
import { Muro } from "src/muro/muro.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("detallefactura")
export default class DetalleFactura {
    @PrimaryGeneratedColumn()
    private idDetalleFactura : number;

    @Column()
    private cantidad : number;
    @Column()
    private muroIdMuro : number;
    @Column()
    private facturaIdFactura : number;

    @ManyToOne(type => Factura,
        factura => factura.detalleFacturas)
    @JoinColumn()
    public factura: Factura;

    @ManyToOne(type => Muro,
        muro => muro.detalleFacturas)
    @JoinColumn()
    public muro: Muro;

    constructor(cantidad: number, idMuro: number, idFactura: number) {
        this.cantidad = cantidad;
        this.muroIdMuro = idMuro;
        this.facturaIdFactura = idFactura;
    }

    public getID(): number {
        return this.idDetalleFactura;
    }
    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(nuevaCantidad: number) {
        this.cantidad = nuevaCantidad;
    }
}