
import { Muro } from "src/muro/muro.entity";
import { TipoMaterial } from "src/tipo_material/tipo-material.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("material")

export class Material {

    @PrimaryGeneratedColumn()
    private idMaterial : number;

    @Column()
    private nombre : string
    @Column()
    private cantidad : number;
    @Column()
    private precio : string;
    @Column()
    private conductividadTermica : string;
    @Column()
    private espesor : string;
    @Column()
    private resistenciaTermica : string;
    @Column()
    private tipoMaterialIdTipoMaterial : number;

    @ManyToOne(type => TipoMaterial,
        tipoMaterial => tipoMaterial.materiales)
    @JoinColumn()
    public tipoMaterial: TipoMaterial;

    @ManyToMany(type => Muro, muro => muro.materiales)
    public muros : Muro[];
    constructor(nombre : string, cantidad : number, precio : string , conductividadT : string, espesor: string,idTipoDeMaterial: number ) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.conductividadTermica = conductividadT;
        this.espesor = espesor;
        this.tipoMaterialIdTipoMaterial = idTipoDeMaterial;
        this.calcularResistenciaTermica();
    }

    public getID(): number {
        return this.idMaterial;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getCantidad(): number {
        return this.cantidad;
    }
    public getPrecio(): string {
        return this.precio;
    }
    public getConductividadTermica(): string {
        return this.conductividadTermica;
    }
    public getEspesor(): string {
        return this.espesor;
    }
    public getResistenciaTermica(): string {
        return this.resistenciaTermica;
    }

    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }
    public setCantidad(nuevaCantidad: number) {
        this.cantidad = nuevaCantidad;
    }
    public setPrecio(nuevoPrecio: string) {
        this.precio = nuevoPrecio;
    }
    public setConductividadTermica(nuevaConductividad: string) {
        this.conductividadTermica = nuevaConductividad;
    }
    public setEspesor(nuevoEspesor: string) {
        this.espesor = nuevoEspesor;
    }
    public calcularResistenciaTermica() {
        this.resistenciaTermica = String(Number(this.espesor) / Number(this.conductividadTermica));
    }
}