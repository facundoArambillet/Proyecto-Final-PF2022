import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'dist/usuario/jwt.guard';
import MuroDTO from './muro.dto';
import { Muro } from './muro.entity';
import { MuroService } from './muro.service';

@Controller('muro')
export class MuroController {
    constructor(private muroService : MuroService){}

    @Get()
    public getAll(): Promise<Muro[]> {
        return this.muroService.getAll();
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<Muro> {
        return this.muroService.getByID(id);
    }
    @Get("all/:id")
    public getAllRelaciones(@Param("id") id: number): Promise<Muro[]> {
        return this.muroService.getAllRelaciones(id);
    }
    // ENDPOINT USADO PARA TRAERME POR ID UN MURO Y SUS RELACIONES
    @Get("/relacion/id/:id")
    public getByIDRelaciones(@Param("id") id: number): Promise<Muro> {
        return this.muroService.getByIDRelaciones(id);
    }
    // ENDPOINT POSIBLEMENTE USABLE PARA TRAER MUROS POR RANGOS DE PRECIO
    @Get("/all/muro/filtro/:precio")
    public getByPrecio(@Param("precio") precio: number): Promise<Muro[]> {
        return this.muroService.getByPrecio(precio);
    }
    @UseGuards(JwtGuard)
    @Post()
    public addMuro(@Body() Muro: MuroDTO): Promise<Muro> {
        return this.muroService.addMuro(Muro);
    }
    @UseGuards(JwtGuard)
    @Put(":id")
    public updateMuro(@Param("id") id: number, @Body() muro: MuroDTO  ): Promise<boolean> {
        return this.muroService.updateMuro(id,muro);
    }
    @UseGuards(JwtGuard)
    @Put("/stock/:id")
    public updateCantidad(@Param("id") id: number, @Body() nuevaCantidad: number  ): Promise<boolean> {
        return this.muroService.updateCantidad(id,nuevaCantidad);
    }
    @UseGuards(JwtGuard)
    @Delete(":id")
    public deleteMuro(@Param("id") id: number): Promise<boolean> {
        return this.muroService.deleteMuro(id);
    }
}

