import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import DetalleFacturaDTO from './detallefactura.dto';
import DetalleFactura from './detallefactura.entity';

@Injectable()
export class DetallefacturaService {
    private detallesFacturas: DetalleFactura[] = [];

    constructor(@InjectRepository(DetalleFactura) private readonly detalleFacturaRepository: Repository<DetalleFactura>) { }

    public async getAll(): Promise<DetalleFactura[]> {
        this.detallesFacturas = await this.detalleFacturaRepository.find();
        return this.detallesFacturas;
    }

    
    public async getAllRelaciones(orden : string): Promise<DetalleFactura[]> {
        let criterio: FindManyOptions = { relations: ['factura','muro'], order : {
            idDetalleFactura : orden
        }}
        this.detallesFacturas = await this.detalleFacturaRepository.find(criterio);
        return this.detallesFacturas;
    }

    

    public async getByID(id: number): Promise<DetalleFactura> {
        try {
            let criterio: FindOneOptions = { where: { idDetalleFactura: id } };
            let detallefactura: DetalleFactura = await this.detalleFacturaRepository.findOne(criterio);
            if (detallefactura) {
                return detallefactura;
            }
            else {
                throw new Error("el detalle de la factura no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda del detalle de factura ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async addDetalle(detalleDTO: DetalleFacturaDTO): Promise<DetalleFactura> {
        try {
            if (detalleDTO) {
                if (detalleDTO.cantidad && detalleDTO.muroIdMuro && detalleDTO.facturaIdFactura) {
                    let detalleFactura = await this.detalleFacturaRepository.save(new DetalleFactura(detalleDTO.cantidad, detalleDTO.muroIdMuro,detalleDTO.facturaIdFactura ));
                    return detalleFactura;
                }
                else {
                    throw new Error("Datos del detalle de factura invalidos");
                }
            }
            else {
                throw new Error("Detalle de factura invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion del detalle de factura: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateDetalle(id: number, detalleDTO: DetalleFacturaDTO): Promise<boolean> {
        try {
            if (id && detalleDTO) {
                if (detalleDTO.cantidad && detalleDTO.muroIdMuro && detalleDTO.facturaIdFactura) {
                    let criterio: FindOneOptions = { where: { idDetalleFactura: id } };
                    let detalleFactura: DetalleFactura = await this.detalleFacturaRepository.findOne(criterio);
                    detalleFactura.setCantidad(detalleDTO.cantidad);

                    detalleFactura = await this.detalleFacturaRepository.save(detalleFactura);
                    return true
                }
                else {
                    throw new Error("Datos del detalle de factura invalidos");
                }
            }
            else {
                throw new Error("id o detalle de factura Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion del detalle de factura: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async deleteDetalle(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idDetalleFactura: id } };
                let detalleFactura: DetalleFactura = await this.detalleFacturaRepository.findOne(criterio);
                await this.detalleFacturaRepository.delete(detalleFactura.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion del detalle de factura: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
}
