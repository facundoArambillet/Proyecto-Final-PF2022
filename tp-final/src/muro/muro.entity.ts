import { CarritoCompras } from "src/carrito_compras/carritoCompras.entity";
import { Factura } from "src/factura/factura.entity";
import { Material } from "src/material/material.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("muro")

export class Muro {

    @PrimaryGeneratedColumn()
    private idMuro: number;

    @Column()
    private nombre: string
    @Column()
    private precio: number;
    @Column()
    private stock: number;
    @Column()
    private imagen: string;
    @Column()
    private descripcion: string;
    @Column()
    private coeficienteDeTransmitancia: string //SI HAGO EL COEFICIENTE DE TIPO NUMBER NO ME LO GUARDA SI ES DECIMAL
    @Column()
    private usuarioIdUsuario: number;


    @ManyToOne(type => Usuario,
        usuario => usuario.muros)
    @JoinColumn()
    public usuario: Usuario;

    // @ManyToMany(type => Factura, factura => factura.muros)
    // @JoinTable()
    // public facturas : Factura[];

    @ManyToMany(type => Material, material => material.muros)
    @JoinTable()
    public materiales: Material[];


    @OneToMany(type => CarritoCompras,
        carritoCompras => carritoCompras.muro)
    @JoinColumn()
    public carritosCompras: CarritoCompras[];

    constructor(nombre: string, precio: number, stock: number, descripcion: string, idUsuario: number, imagen?: string) {
        this.coeficienteDeTransmitancia = this.calcularCoeficiente();
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.usuarioIdUsuario = idUsuario;

    }

    public getID(): number {
        return this.idMuro;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getPrecio(): number {
        return this.precio;
    }
    public getCantidad(): number {
        return this.stock;
    }
    public getImagen(): string {
        return this.imagen;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getCoeficienteDeTransmitancia(): string {
        return this.coeficienteDeTransmitancia;
    }

    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }
    public setPrecio(nuevoPrecio: number) {
        this.precio = nuevoPrecio;
    }
    public setCantidad(nuevaCantidad: number) {
        this.stock = nuevaCantidad;
    }
    public setImagen(nuevaImagen: string) {
        this.imagen = nuevaImagen;
    }
    public setDescripcion(nuevaDescripcion: string) {
        this.descripcion = nuevaDescripcion;
    }
    public setMateriales(nuevosMateriales: Material[]) {
        this.materiales = nuevosMateriales;
    }

    public calcularCoeficiente() {
        let resistenciaTotal: number = 0;
        let coeficiente: string;
        if (this.materiales) {
            for (let i = 0; i < this.materiales.length; i++) {
                this.materiales[i].calcularResistenciaTermica()
                resistenciaTotal += this.materiales[i].getResistenciaTermica();
            }
            this.coeficienteDeTransmitancia = (1 / resistenciaTotal).toString();
            let coeficiente = this.coeficienteDeTransmitancia;
            return coeficiente;
        }
        return coeficiente;
    }
}