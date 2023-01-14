import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';import FacturaDTO from './factura.dto';
;
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Controller('factura')
export class FacturaController {
    constructor(private facturaService : FacturaService) {}
    @Get()
    public getAll(): Promise<Factura[]> {
        return this.facturaService.getAll();
    }
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<Factura[]> {
        return this.facturaService.getAllRelaciones(orden);
    }
    @Get("all/id/:id")
    public getByIDRelaciones(@Param("id") id: number): Promise<Factura> {
        return this.facturaService.getByIDRelaciones(id);
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<Factura> {
        return this.facturaService.getByID(id);
    }
    @Post()
    public addFactura(@Body() factura: FacturaDTO): Promise<Factura> {
        return this.facturaService.addFactura(factura);
    }
    @Put(":id")
    public updateFactura(@Param("id") id: number, @Body() factura: FacturaDTO  ): Promise<boolean> {
        return this.facturaService.updateFactura(id,factura);
    }
    @Delete(":id")
    public deleteFactura(@Param("id") id: number): Promise<boolean> {
        return this.facturaService.deleteFactura(id);
    }
}
