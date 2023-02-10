import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Muro } from 'src/muro/muro.entity';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import FacturaDTO from './factura.dto';
import { Factura } from './factura.entity';

@Injectable()
export class FacturaService {
    private facturas: Factura[] = [];

    constructor(@InjectRepository(Factura) private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Muro) private readonly muroRepository: Repository<Muro>) { }

    public async getAll(): Promise<Factura[]> {
        this.facturas = await this.facturaRepository.find();
        return this.facturas;
    }

    public async getAllRelaciones(orden : string): Promise<Factura[]> {
        let criterio: FindManyOptions = { relations: ['usuario','muros'], order : {
            idFactura : orden
        }}
        this.facturas = await this.facturaRepository.find(criterio);
        return this.facturas;
    }

    public async getByID(id: number): Promise<Factura> {
        try {
            let criterio: FindOneOptions = { where: { idFactura: id } };
            let factura: Factura = await this.facturaRepository.findOne(criterio);
            if (factura) {
                return factura;
            }
            else {
                throw new Error("La factura no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de la factura ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getByIDRelaciones(id: number): Promise<Factura> {
        try {
            let criterio: FindOneOptions = { relations: ['usuario','muros'], where: { idFactura: id } };
            let factura: Factura = await this.facturaRepository.findOne(criterio);
            if (factura) {
                return factura;
            }
            else {
                throw new Error("La factura no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de la factura ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async addFactura(facturaDTO: FacturaDTO): Promise<Factura> {
        try {
            if (facturaDTO) {
                if (facturaDTO.fecha && facturaDTO.total && facturaDTO.idsMuros) {
                    let IdsMuros: number[] = facturaDTO.idsMuros;
                    let muros = await this.muroRepository.findByIds(IdsMuros);
                    let factura = new Factura(facturaDTO.fecha, facturaDTO.total, facturaDTO.usuarioIdUsuario);
                    factura.setMuros(muros)
                    await this.facturaRepository.save(factura);

                    return factura;
                }
                else {
                    throw new Error("Datos de la factura invalidos");
                }
            }
            else {
                throw new Error("factura invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion de la factura: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async updateFactura(id: number, facturaDTO: FacturaDTO): Promise<boolean> {
        try {
            if (id && facturaDTO) {
                if (facturaDTO.fecha,facturaDTO.total) {
                    let criterio: FindOneOptions = { where: { idFactura: id } };
                    let factura: Factura = await this.facturaRepository.findOne(criterio);
                    factura.setFecha(facturaDTO.fecha);
                    factura.setTotal(facturaDTO.total);
                    factura = await this.facturaRepository.save(factura);
                    return true
                }
                else {
                    throw new Error("Datos de la factura invalidos");
                }
            }
            else {
                throw new Error("id o factura Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de la factura: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async deleteFactura(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idFactura: id } };
                let factura: Factura = await this.facturaRepository.findOne(criterio);
                await this.facturaRepository.delete(factura.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion de factura: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
}
