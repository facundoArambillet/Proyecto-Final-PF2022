import { Material } from "src/material/material.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tipomaterial")

export class TipoMaterial {
    @PrimaryGeneratedColumn()
    private idTipoMaterial: number;

    @Column()
    private nombre: string

    @OneToMany(type => Material,
        material => material.tipoMaterial)
    @JoinColumn()
    public materiales: Material[];

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    public getID(): number {
        return this.idTipoMaterial;
    }
    public getNombre(): string {
        return this.nombre;
    }


    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }
}