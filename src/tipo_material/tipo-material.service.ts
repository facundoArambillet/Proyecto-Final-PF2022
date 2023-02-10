import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MaterialDTO from 'src/material/material.dto';
import { Material } from 'src/material/material.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import TipoMaterialDTO from './tipo-material.dto';
import { TipoMaterial } from './tipo-material.entity';

@Injectable()
export class TipoMaterialService {
    private tiposMateriales: TipoMaterial[] = [];

    constructor(@InjectRepository(TipoMaterial) private readonly tipoMaterialRepository: Repository<TipoMaterial>) { }

    public async getAll(): Promise<TipoMaterial[]> {
        this.tiposMateriales = await this.tipoMaterialRepository.find();
        return this.tiposMateriales;
    }

    public async getByID(id: number): Promise<TipoMaterial> {
        try {
            let criterio: FindOneOptions = { where: { idTipoMaterial: id } };
            let tipoMaterial: TipoMaterial = await this.tipoMaterialRepository.findOne(criterio);
            if (tipoMaterial) {
                return tipoMaterial;
            }
            else {
                throw new Error("El tipo de material no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de tipo de material ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getByNombre(nombre: string): Promise<TipoMaterial> {
        try {
            let criterio: FindOneOptions = { where: { nombre: nombre } };
            let tipoMaterial: TipoMaterial = await this.tipoMaterialRepository.findOne(criterio);
            if (tipoMaterial) {
                return tipoMaterial;
            }
            else {
                throw new Error("El tipo de material no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de tipo de material ${nombre}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getByNombreRelaciones(nombre: string): Promise<TipoMaterial[]> {
        let criterio : FindManyOptions = {relations : ["materiales"], where : {
            nombre : nombre
        }};
        this.tiposMateriales = await this.tipoMaterialRepository.find(criterio);
        return this.tiposMateriales;
    }

    public async addTipoMaterial(tipoMaterialDTO: TipoMaterialDTO): Promise<TipoMaterial> {
        try {
            if (tipoMaterialDTO) {
                if (tipoMaterialDTO.nombre) {
                    let tipoMaterial = await this.tipoMaterialRepository.save(new TipoMaterial(tipoMaterialDTO.nombre));
                    return tipoMaterial;
                }
                else {
                    throw new Error("Datos de tipo de material invalidos");
                }
            }
            else {
                throw new Error("Tipo de material invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion de tipo de material: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateTipoMaterial(id: number, tipoMaterialDTO: TipoMaterialDTO): Promise<boolean> {
        try {
            if (id && tipoMaterialDTO) {
                if (tipoMaterialDTO.nombre) {
                    let criterio: FindOneOptions = { where: { idTipoMaterial: id } };
                    let tipoMaterial: TipoMaterial = await this.tipoMaterialRepository.findOne(criterio);
                    tipoMaterial.setNombre(tipoMaterialDTO.nombre);
                    tipoMaterial = await this.tipoMaterialRepository.save(tipoMaterial);
                    return true
                }
                else {
                    throw new Error("Datos de tipo de material invalidos");
                }
            }
            else {
                throw new Error("id o tipo de material Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de tipo de material: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async deleteTipoMaterial(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idTipoMaterial: id } };
                let tipoMaterial: TipoMaterial = await this.tipoMaterialRepository.findOne(criterio);
                await this.tipoMaterialRepository.delete(tipoMaterial.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion de tipo material: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
}
