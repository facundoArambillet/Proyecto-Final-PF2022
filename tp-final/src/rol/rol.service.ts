import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import Rol from './rol.entity';

@Injectable()
export class RolService {
    private roles: Rol[] = [];

    constructor(@InjectRepository(Rol) private readonly rolRepository: Repository<Rol>) { }

    public async getAll(): Promise<Rol[]> {
        this.roles = await this.rolRepository.find();
        return this.roles;
    }


    public async getByID(id: number): Promise<Rol> {
        try {
            let criterio: FindOneOptions = { where: { idRol: id } };
            let rol: Rol = await this.rolRepository.findOne(criterio);
            if (rol) {
                return rol;
            }
            else {
                throw new Error("El rol no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de tipo de rol ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }
}
