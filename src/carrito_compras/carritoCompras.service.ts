import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Muro } from 'src/muro/muro.entity';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import CarritoComprasDTO from './carritoCompras.dto';
import { CarritoCompras } from './carritoCompras.entity';

@Injectable()
export class CarritoComprasService {
    private carritosCompras: CarritoCompras[] = [];

    constructor(@InjectRepository(CarritoCompras) private readonly carritoComprasRepository: Repository<CarritoCompras>,
        @InjectRepository(Muro) private readonly muroRepository: Repository<Muro>) { }

    public async getAll(): Promise<CarritoCompras[]> {
        this.carritosCompras = await this.carritoComprasRepository.find();
        return this.carritosCompras;
    }


    public async getAllRelaciones(id: number): Promise<CarritoCompras[]> {
        let criterio: FindManyOptions = {
            relations: ['usuario', 'muro'], where: {
                idCarritoDeCompras: id
            }
        }
        this.carritosCompras = await this.carritoComprasRepository.find(criterio);
        return this.carritosCompras;
    }



    public async getByID(id: number): Promise<CarritoCompras> {
        try {
            let criterio: FindOneOptions = { where: { idCarritoDeCompras: id } };
            let carritoCompras: CarritoCompras = await this.carritoComprasRepository.findOne(criterio);
            if (carritoCompras) {
                return carritoCompras;
            }
            else {
                throw new Error("el carrito  no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda del carrito de compras${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getCarritosUsuario(idUsuario: number) {
        try {
            let criterio: FindManyOptions = {
                relations: ['muro'], where: {
                    usuarioIdUsuario: idUsuario
                }
            }
            let carritosCompras: CarritoCompras[] = await this.carritoComprasRepository.find(criterio);
            if (carritosCompras) {
                return carritosCompras;
            }
            else {
                throw new Error("el usuario no posee carritos ");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de los carritos del usuario${idUsuario}: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }


    public async addCarrito(carritoDTO: CarritoComprasDTO): Promise<CarritoCompras> {
        try {

            if (carritoDTO) {
                if (carritoDTO.precioTotal && carritoDTO.usuarioIdUsuario && carritoDTO.muroIdMuro) {
                    let criterio : FindOneOptions = {where : {usuarioIdUsuario: carritoDTO.usuarioIdUsuario, muroIdMuro: carritoDTO.muroIdMuro }}
                    let carrito = await this.carritoComprasRepository.findOne(criterio);
                    if(carrito) {
                        let nuevaCantidad = carrito.getCantidad();
                        carrito.setCantidad((nuevaCantidad+1));
                        await this.carritoComprasRepository.save(carrito);
                        return carrito;
                    }
                    else {
                        let carritoCompras = new CarritoCompras(carritoDTO.precioTotal, carritoDTO.cantidad, carritoDTO.usuarioIdUsuario, carritoDTO.muroIdMuro);
                        await this.carritoComprasRepository.save(carritoCompras);
                        return carritoCompras;
                    }

                }
                else {
                    throw new Error("Datos del carrito de compras invalidos");
                }
            }

            else {
                throw new Error("carrito de compras invalido");

            }


        }
        catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion del carrito de compras: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateCarrito(id: number, carritoDTO: CarritoComprasDTO): Promise<boolean> {
        try {
            if (id && carritoDTO) {
                if (carritoDTO.precioTotal && carritoDTO.usuarioIdUsuario) {
                    let criterio: FindOneOptions = { where: { idCarritoDeCompras: id } };
                    let carritoCompras: CarritoCompras = await this.carritoComprasRepository.findOne(criterio);
                    carritoCompras.setCantidad(carritoDTO.cantidad);

                    carritoCompras = await this.carritoComprasRepository.save(carritoCompras);
                    return true
                }
                else {
                    throw new Error("Datos del carrito de compras invalidos");
                }
            }
            else {
                throw new Error("id o carrito de compras Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion del carrito de compras: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }


    public async deleteCarrito(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idCarritoDeCompras: id } };
                let carritoCompras: CarritoCompras = await this.carritoComprasRepository.findOne(criterio);
                await this.carritoComprasRepository.delete(carritoCompras.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion del carrito de compras: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }
}
