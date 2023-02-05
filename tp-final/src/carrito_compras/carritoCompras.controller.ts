import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<CarritoCompras> {
        return this.carritoComprasService.getByID(id);
    }
    @Get("all/:id")
    public getAllRelaciones(@Param("id") id: number): Promise<CarritoCompras[]> {
        return this.carritoComprasService.getAllRelaciones(id);
    }
    // ENDPOINT QUE ME TRAE TODOS LOS CARRITOS DE UN USUARIO(usado para cargar/eliminar los muros y mostrarlos en carrito.html)
    @Get("usuario/all/:id")
    public getCarritosUsuario(@Param("id") id: number): Promise<CarritoCompras[]> {
        return this.carritoComprasService.getCarritosUsuario(id);
    }

    @Post()
    public addCarrito(@Body() carritoCompras: CarritoComprasDTO): Promise<CarritoCompras> {
        return this.carritoComprasService.addCarrito(carritoCompras);
    }
    @Put(":id")
    public updateCarrito(@Param("id") id: number, @Body() carritoCompras: CarritoComprasDTO ): Promise<boolean> {
        return this.carritoComprasService.updateCarrito(id,carritoCompras);
    }
    @Delete(":id")
    public deleteCarrito(@Param("id") id: number): Promise<boolean> {
        return this.carritoComprasService.deleteCarrito(id);
    }
}
