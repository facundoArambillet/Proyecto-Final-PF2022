
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("factura_muros_muro")
export class DetalleFactura {
    @PrimaryColumn()
    private muroIdMuro : number;
    @PrimaryColumn()
    private facturaIdFactura : number;

    @Column()
    private cantidad : number


    constructor(muroIdMuro : number, facturaIdFactura: number, cantidad: number) {
        this.muroIdMuro = muroIdMuro;
        this.facturaIdFactura = facturaIdFactura;
        this.cantidad = cantidad;
    }

    public getIdMuro(): number {
        return this.muroIdMuro;
    }
    public getIdFactura(): number  {
        return this.facturaIdFactura;
    }
    public getCantidad(): number  {
        return this.cantidad;
    }

    public setCantidad(nuevaCantidad: number): void {
        this.cantidad = nuevaCantidad;
    }
}