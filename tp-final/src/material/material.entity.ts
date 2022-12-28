
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
    private precio : number;
    @Column()
    private conductividadTermica : number;
    @Column()
    private espesor : number;
    @Column()
    private resistenciaTermica : number;
    @Column()
    private tipoMaterialIdTipoMaterial : number;

    @ManyToOne(type => TipoMaterial,
        tipoMaterial => tipoMaterial.materiales)
    @JoinColumn()
    public tipoMaterial: TipoMaterial;

    @ManyToMany(type => Muro, muro => muro.materiales)
    public muros : Muro[];
    constructor(nombre : string, cantidad : number, precio : number , conductividadT : number, espesor: number,idTipoDeMaterial: number ) {
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
    public getPrecio(): number {
        return this.precio;
    }
    public getConductividadTermica(): number {
        return this.conductividadTermica;
    }
    public getEspesor(): number {
        return this.espesor;
    }
    public getResistenciaTermica(): number {
        return this.resistenciaTermica;
    }

    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }
    public setCantidad(nuevaCantidad: number) {
        this.cantidad = nuevaCantidad;
    }
    public setPrecio(nuevoPrecio: number) {
        this.precio = nuevoPrecio;
    }
    public setConductividadTermica(nuevaConductividad: number) {
        this.conductividadTermica = nuevaConductividad;
    }
    public setEspesor(nuevoEspesor: number) {
        this.espesor = nuevoEspesor;
    }
    public calcularResistenciaTermica() {
        this.resistenciaTermica = (this.espesor / this.conductividadTermica);
    }
}