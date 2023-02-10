import { CarritoCompras } from "src/carrito_compras/carritoCompras.entity";
import { Factura } from "src/factura/factura.entity";
import { Muro } from "src/muro/muro.entity";
import Rol from "src/rol/rol.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export class Usuario {
    @PrimaryGeneratedColumn()
    private idUsuario : number;

    @Column()
    private nombre : string
    @Column()
    private contrasenia : string;
    @Column()
    private rolIdRol: number;

    @OneToMany(type => Muro,
        muro => muro.usuario)
    @JoinColumn()
    public muros: Muro[];

    @OneToMany(type => Factura,
        factura => factura.usuario)
    @JoinColumn()
    public facturas: Factura[];

    @ManyToOne(type => Rol,
        rol => rol.usuarios)
    @JoinColumn()
    public rol: Rol;

    @OneToMany(type => CarritoCompras,
        carritoCompras => carritoCompras.usuario)
    @JoinColumn()
    public carritosCompras: CarritoCompras[];

    constructor(nombre : string, contrasenia: string, idRol: number) {
        this.nombre = nombre;
        this.contrasenia = contrasenia;
        this.rolIdRol = idRol;
    }

    public getID(): number {
        return this.idUsuario;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getContrasenia(): string {
        return this.contrasenia;
    }
    public getRol(): number {
        return this.rolIdRol;
    }
    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }
    public setContrasenia(nuevaContrasenia: string) {
        this.contrasenia = nuevaContrasenia;
    }
}