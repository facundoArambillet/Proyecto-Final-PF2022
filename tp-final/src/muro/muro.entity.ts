import { CarritoCompras } from "src/carrito_compras/carritoCompras.entity";
import { Factura } from "src/factura/factura.entity";
import { Material } from "src/material/material.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("muro")

export class Muro {

    @PrimaryGeneratedColumn()
    private idMuro : number;

    @Column()
    private nombre : string
    @Column()
    private precio : number;
    @Column()
    private stock : number;
    @Column()
    private imagen : string;
    @Column()
    private descripcion : string;
    // CAMBIAR VALOR A PRIVADO CUANDO TERMINE DE PROBAR PORQUE EN LA BDD NO ME SETEA ESTE VALOR CORRECTAMENTE
    @Column()
    private coeficienteDeTransmitancia : number //Probe tambien con GLfloat;
    @Column()
    private usuarioIdUsuario : number;


    @ManyToOne(type => Usuario,
        usuario => usuario.muros)
    @JoinColumn()
    public usuario: Usuario;

    // @ManyToMany(type => Factura, factura => factura.muros)
    // @JoinTable()
    // public facturas : Factura[];

    @ManyToMany(type => Material, material => material.muros)
    @JoinTable()
    public materiales : Material[];
    

    @OneToMany(type => CarritoCompras,
        carritoCompras => carritoCompras.muro)
    @JoinColumn()
    public carritosCompras: CarritoCompras[];

    constructor(nombre : string, precio : number, stock : number, descripcion: string, idUsuario : number,imagen?: string) {
        this.calcularCoeficiente();
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
    public getCoeficienteDeTransmitancia(): number {
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
    public setMateriales(nuevosMateriales : Material[]) {
        this.materiales = nuevosMateriales;
    }
    public setCoeficiente(valor  : number) {
        this.coeficienteDeTransmitancia = valor
    }
    public calcularCoeficiente() {
        let resistenciaTotal : number = 0;
        let coeficiente: number = 0
        if(this.materiales) {
            for(let i = 0; i < this.materiales.length; i++) {
                this.materiales[i].calcularResistenciaTermica()
                resistenciaTotal += this.materiales[i].getResistenciaTermica();
            }
            this.coeficienteDeTransmitancia = 1 / resistenciaTotal;
             let coeficiente =  1 / resistenciaTotal;
             return coeficiente;
        }

    }
}