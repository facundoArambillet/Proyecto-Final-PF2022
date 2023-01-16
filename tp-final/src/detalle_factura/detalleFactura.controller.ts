import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import detalleFacturaDTO from './detalleFactura.dto';
import { DetalleFactura } from './detalleFactura.entity';
import { DetalleFacturaService } from './detalleFactura.service';

@Controller('detalle-factura')
export class DetalleFacturaController {
    constructor(private detalleFacturaService : DetalleFacturaService) {}
    @Get(":id")
    public getByIDFactura(@Param("id") id: number): Promise<DetalleFactura[]> {
        return this.detalleFacturaService.getByID(id);
    }
    @Put()
    public updateCantidad( @Body() detalle: detalleFacturaDTO  ): Promise<boolean> {
        return this.detalleFacturaService.updateCantidad(detalle);
    }
}
