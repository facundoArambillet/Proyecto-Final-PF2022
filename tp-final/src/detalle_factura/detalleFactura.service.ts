import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleFactura } from './detalleFactura.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import detalleFacturaDTO from './detalleFactura.dto';
@Injectable()
export class DetalleFacturaService {
    constructor(@InjectRepository(DetalleFactura) private readonly detalleFacturaRepository: Repository<DetalleFactura>) { }

    public async getByID(idFactura: number) {
        try {
            let criterio: FindManyOptions = { where: { facturaIdFactura: idFactura } };
            let detalleFactura: DetalleFactura[] = await this.detalleFacturaRepository.find(criterio);

            return detalleFactura

        } catch (error) {

        }

    }

    public async updateCantidad(detalleDTO : detalleFacturaDTO): Promise<boolean> {
        try {
            if (detalleDTO) {
                let criterio: FindOneOptions = { where: { facturaIdFactura: detalleDTO.facturaIdFactura, muroIdMuro: detalleDTO.muroIdMuro } }
                let detalle: DetalleFactura = await this.detalleFacturaRepository.findOne(criterio);
                detalle.setCantidad(detalleDTO.cantidad);
                detalle = await this.detalleFacturaRepository.save(detalle);
                return true;
            }
        } catch (error) {
            
        }

    }
}
