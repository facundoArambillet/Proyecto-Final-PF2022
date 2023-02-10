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

    public async getAllRelaciones(idUsuario: number): Promise<Muro[]> {
        let criterio: FindManyOptions = {
            relations: ["usuario", "materiales", "carritosCompras"], where: {
                usuarioIdUsuario: idUsuario
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
                muro.calcularCoeficiente();  //SI LO PONGO TRAE CORRECTAMENTE EL VALOR PERO EN LA BDD SIGUE APARECIENDO 0
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

    public async getByPrecio(precio: number): Promise<Muro[]> {
        try {;
            if(precio <= 15000) {

                let muros: Muro[] = await this.muroRepository
                .createQueryBuilder("muros")
                .where("usuarioIdUsuario = 1 AND precio <= 15000")
                .getMany()
                return muros;
            }
            else if(precio < 30000) {
                let muros: Muro[] = await this.muroRepository
                .createQueryBuilder("muros")
                .where("usuarioIdUsuario = 1 AND precio >= 15000 AND precio <= 30000 ")
                .getMany()
                return muros;
            }
            else if(precio > 30000) {
                let muros: Muro[] = await this.muroRepository
                .createQueryBuilder("muros")
                .where("usuarioIdUsuario = 1 AND precio > 30000 ")
                .getMany()
                return muros;
            }
            else {
                throw new Error("No se encuentra muro con ese parametro de precio");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en los filtros de precios ${precio}: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }

    public async addMuro(muroDTO: MuroDTO): Promise<Muro> {
        try {
            if (muroDTO) {
                if (muroDTO.nombre && muroDTO.precio && muroDTO.stock && muroDTO.descripcion && muroDTO.idsMateriales) {
                    let IdsMateriales: number[] = muroDTO.idsMateriales;
                    let materiales = await this.materialRepository.findByIds(IdsMateriales)
                    let muro = new Muro(muroDTO.nombre, muroDTO.precio, muroDTO.stock,
                        muroDTO.descripcion, muroDTO.usuarioIdUsuario, muroDTO.imagen);
                    muro.setMateriales(materiales);
                    muro.calcularCoeficiente();
                    await this.muroRepository.save(muro) //SI HAGO EL COEFICIENTE DE TIPO NUMBER NO ME LO GUARDA SI ES DECIMAL
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
                    muro.setCantidad(muroDTO.stock);
                    muro.setImagen(muroDTO.imagen);
                    muro.setDescripcion(muroDTO.descripcion);
                    muro = await this.muroRepository.save(muro);
                    return true;
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
            if (id && nuevaCantidad && nuevaCantidad.stock >= 0) {
                let criterio: FindOneOptions = { where: { idMuro: id } };
                let muro: Muro = await this.muroRepository.findOne(criterio);
                muro.setCantidad(nuevaCantidad.stock)
                muro = await this.muroRepository.save(muro);
                return true;
            }
            else {
                throw new Error("Datos de stock invalidos");
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
