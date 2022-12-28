import { Material } from "src/material/material.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rol")
export default class Rol {

    @PrimaryGeneratedColumn()
    private idRol: number;

    @Column()
    private nombre: string

    @OneToMany(type => Usuario,
        usuario => usuario.rol)
    @JoinColumn()
    public usuarios: Usuario[];

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    public getID(): number {
        return this.idRol;
    }
    public getNombre(): string {
        return this.nombre;
    }
}