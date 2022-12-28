import { Controller, Get, Param } from '@nestjs/common';
import Rol from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
    constructor(private rolService : RolService){}

    @Get()
    public getAll(): Promise<Rol[]> {
        return this.rolService.getAll();
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<Rol> {
        return this.rolService.getByID(id);
    }
}
