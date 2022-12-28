import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import DetalleFacturaDTO from 'src/detalle_factura/detallefactura.dto';
import DetalleFactura from 'src/detalle_factura/detallefactura.entity';
import CarritoComprasDTO from './carritoCompras.dto';
import { CarritoCompras } from './carritoCompras.entity';
import { CarritoComprasService } from './carritoCompras.service';

@Controller('carrito-compras')
export class CarritoComprasController {
    constructor(private carritoComprasService : CarritoComprasService) {}
    @Get()
    public getAll(): Promise<CarritoCompras[]> {
        return this.carritoComprasService.getAll();
    }
    
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<CarritoCompras[]> {
        return this.carritoComprasService.getAllRelaciones(orden);
    }
    
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<CarritoCompras> {
        return this.carritoComprasService.getByID(id);
    }
    @Post()
    public addCarrito(@Body() carritoCompras: CarritoComprasDTO): Promise<CarritoCompras> {
        return this.carritoComprasService.addCarrito(carritoCompras);
    }
    // @Put(":id")
    // public updateCarrito(@Param("id") id: number, @Body() carritoCompras: CarritoComprasDTO ): Promise<boolean> {
    //     return this.carritoComprasService.updateCarrito(id,carritoCompras);
    // }
    @Delete(":id")
    public deleteCarrito(@Param("id") id: number): Promise<boolean> {
        return this.carritoComprasService.deleteCarrito(id);
    }
}
