import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import MaterialDTO from './material.dto';
import { Material } from './material.entity';

@Injectable()
export class MaterialService {
    private materiales: Material[] = [];

    constructor(@InjectRepository(Material) private readonly materialRepository: Repository<Material>) { }

    public async getAll(): Promise<Material[]> {
        this.materiales = await this.materialRepository.find();
        for(let i = 0; i < this.materiales.length; i++) {
            this.materiales[i].calcularResistenciaTermica();
        }
        return this.materiales;
    }

    public async getAllRelaciones(id: number): Promise<Material[]> {
        let criterio : FindManyOptions = {relations : ["tipoMaterial"], where : {tipoMaterialIdTipoMaterial : id}};
        this.materiales = await this.materialRepository.find(criterio);
        return this.materiales;
    }

    public async getByID(id: number): Promise<Material> {
        try {
            let criterio: FindOneOptions = { where: { idMaterial: id } };
            let material: Material = await this.materialRepository.findOne(criterio);
            if (material) {
                return material;
            }
            else {
                throw new Error("El material no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de material ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }


    public async addMaterial(materialDTO: MaterialDTO): Promise<Material> {
        try {
            if (materialDTO) {
                if (materialDTO.nombre && materialDTO.cantidad && materialDTO.precio && materialDTO.conductividadTermica
                    && materialDTO.espesor) {
                    let material = await this.materialRepository.save(new Material(materialDTO.nombre, materialDTO.cantidad, materialDTO.precio, materialDTO.conductividadTermica,
                        materialDTO.espesor, materialDTO.tipoMaterialIdTipoMaterial));
                    return material;
                }
                else {
                    throw new Error("Datos de material invalidos");
                }
            }
            else {
                throw new Error("Material invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion de material: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateMaterial(id: number, materialDTO: MaterialDTO): Promise<boolean> {
        try {
            if (id && materialDTO) {
                if (materialDTO.nombre && materialDTO.cantidad && materialDTO.precio && materialDTO.conductividadTermica
                    && materialDTO.espesor) {
                    let criterio: FindOneOptions = { where: { idMaterial: id } };
                    let material: Material = await this.materialRepository.findOne(criterio);
                    material.setNombre(materialDTO.nombre);
                    material.setCantidad(materialDTO.cantidad);
                    material.setPrecio(materialDTO.precio);
                    material.setConductividadTermica(materialDTO.conductividadTermica);
                    material.setEspesor(materialDTO.espesor);
                    material = await this.materialRepository.save(material);
                    return true
                }
                else {
                    throw new Error("Datos de material invalidos");
                }
            }
            else {
                throw new Error("id o material Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de material: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async deleteMaterial(id: number): Promise<Material> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idMaterial: id }, relations : ["tipoMaterial"] };
                let material: Material = await this.materialRepository.findOne(criterio);
                await this.materialRepository.delete(material.getID());
                return material;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion de material: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
}
