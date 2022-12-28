import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import DetalleFacturaDTO from './detallefactura.dto';
import DetalleFactura from './detallefactura.entity';

import { DetallefacturaService } from './detallefactura.service';

@Controller('detallefactura')
export class DetallefacturaController {
    constructor(private detalleFacturaService : DetallefacturaService) {}
    @Get()
    public getAll(): Promise<DetalleFactura[]> {
        return this.detalleFacturaService.getAll();
    }
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<DetalleFactura[]> {
        return this.detalleFacturaService.getAllRelaciones(orden);
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<DetalleFactura> {
        return this.detalleFacturaService.getByID(id);
    }
    @Post()
    public addDetalle(@Body() detalleFactura: DetalleFacturaDTO): Promise<DetalleFactura> {
        return this.detalleFacturaService.addDetalle(detalleFactura);
    }
    @Put(":id")
    public updateDetalle(@Param("id") id: number, @Body() detalleFactura: DetalleFacturaDTO  ): Promise<boolean> {
        return this.detalleFacturaService.updateDetalle(id,detalleFactura);
    }
    @Delete(":id")
    public deleteDetalle(@Param("id") id: number): Promise<boolean> {
        return this.detalleFacturaService.deleteDetalle(id);
    }
}
