import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<Muro[]> {
        return this.muroService.getAllRelaciones(orden);
    }
    @Get("/relacion/id/:id")
    public getByIDRelaciones(@Param("id") id: number): Promise<Muro> {
        return this.muroService.getByIDRelaciones(id);
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<Muro> {
        return this.muroService.getByID(id);
    }
    @Post()
    public addMuro(@Body() Muro: MuroDTO): Promise<Muro> {
        return this.muroService.addMuro(Muro);
    }
    @Put(":id")
    public updateMuro(@Param("id") id: number, @Body() muro: MuroDTO  ): Promise<boolean> {
        return this.muroService.updateMuro(id,muro);
    }
    @Put("/stock/:id")
    public updateCantidad(@Param("id") id: number, @Body() nuevaCantidad: number  ): Promise<boolean> {
        return this.muroService.updateCantidad(id,nuevaCantidad);
    }
    @Delete(":id")
    public deleteMuro(@Param("id") id: number): Promise<boolean> {
        return this.muroService.deleteMuro(id);
    }
}

