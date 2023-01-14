import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from 'src/material/material.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import MuroDTO from './muro.dto';
import { Muro } from './muro.entity';

@Injectable()
export class MuroService {
    private muros: Muro[] = [];

    constructor(@InjectRepository(Muro) private readonly muroRepository: Repository<Muro>,
        @InjectRepository(Material) private readonly materialRepository: Repository<Material>) { }

    public async getAll(): Promise<Muro[]> {
        this.muros = await this.muroRepository.find();
        return this.muros;
    }

    public async getAllRelaciones(orden: string): Promise<Muro[]> {
        let criterio: FindManyOptions = {
            relations: ["usuario", "materiales", "carritosCompras"], order: {
                idMuro: orden
            }
        };
        this.muros = await this.muroRepository.find(criterio);
        for (let i = 0; i < this.muros.length; i++) {
            if (this.muros[i].materiales.length >= 1) {
                this.muros[i].calcularCoeficiente();
            }
        }
        return this.muros;
    }
    /* EN CASO DE USAR ARMAR ENDPOINT EN EL CONTROLLER
    
    public async getByIDRelaciones(id: number): Promise<Muro> {
        try {
            let criterio: FindOneOptions = { where: { idMuro: id }, relations : ["usuario","materiales"] };
            let muro: Muro = await this.muroRepository.findOne(criterio);
            if (muro) {
                muro.calcularCoeficiente()
                return muro;
            }
            else {
                throw new Error("El muro no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de muro ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }
    */
    public async getByID(id: number): Promise<Muro> {
        try {
            let criterio: FindOneOptions = { where: { idMuro: id }, };
            let muro: Muro = await this.muroRepository.findOne(criterio);
            if (muro) {
                return muro;
            }
            else {
                throw new Error("El muro no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de muro ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getByIDRelaciones(id: number): Promise<Muro> {
        try {
            let criterio: FindOneOptions = { where: { idMuro: id }, relations: ["materiales"] };
            let muro: Muro = await this.muroRepository.findOne(criterio);
            if (muro) {
                return muro;
            }
            else {
                throw new Error("El muro no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de muro ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async addMuro(muroDTO: MuroDTO): Promise<Muro> {
        try {
            if (muroDTO) {                                                                       //CON ESTO NO ME PUEDEN CARGAR MUROS SIN MATERIALES
                if (muroDTO.nombre && muroDTO.precio && muroDTO.cantidad && muroDTO.descripcion && muroDTO.idsMateriales) {
                    let IdsMateriales: number[] = muroDTO.idsMateriales;
                    let materiales = await this.materialRepository.findByIds(IdsMateriales)
                    let muro = new Muro(muroDTO.nombre, muroDTO.precio, muroDTO.cantidad,
                        muroDTO.descripcion, muroDTO.usuarioIdUsuario, muroDTO.imagen);
                    muro.setMateriales(materiales);
                    console.log(muro)
                    await this.muroRepository.save(muro)

                    return muro;
                }
                else {
                    throw new Error("Datos de muro invalidos");
                }
            }
            else {
                throw new Error("Muro invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion de muro: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateMuro(id: number, muroDTO: MuroDTO): Promise<boolean> {
        try {
            if (id && muroDTO) {
                if (muroDTO.nombre && muroDTO.precio && muroDTO.imagen && muroDTO.descripcion && muroDTO.idsMateriales) {
                    let criterio: FindOneOptions = { where: { idMuro: id } };
                    let muro: Muro = await this.muroRepository.findOne(criterio);
                    muro.setNombre(muroDTO.nombre);
                    muro.setPrecio(muroDTO.precio);
                    muro.setCantidad(muroDTO.cantidad);
                    muro.setImagen(muroDTO.imagen);
                    muro.setDescripcion(muroDTO.descripcion);
                    muro = await this.muroRepository.save(muro);
                    return true
                }
                else {
                    throw new Error("Datos de muro invalidos");
                }
            }
            else {
                throw new Error("id o muro Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de muro: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateCantidad(id: number, nuevaCantidad: any): Promise<boolean> {
        try {
            if (id && nuevaCantidad && nuevaCantidad.cantidad >= 0) {
                let criterio: FindOneOptions = { where: { idMuro: id } };
                let muro: Muro = await this.muroRepository.findOne(criterio);
                muro.setCantidad(nuevaCantidad.cantidad)
                muro = await this.muroRepository.save(muro);
                return true;
            }
            else {
                throw new Error("Datos de cantidad invalidos");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de muro: ${error}` },
                HttpStatus.NOT_FOUND)
        }

    }
    public async deleteMuro(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idMuro: id } };
                let muro: Muro = await this.muroRepository.findOne(criterio);
                await this.muroRepository.delete(muro.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion de muro: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }
}
