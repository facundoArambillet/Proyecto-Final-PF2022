import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import UsuarioDTO from './usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService : UsuarioService){}

    @Get()
    public getAll(): Promise<Usuario[]> {
        return this.usuarioService.getAll();
    }
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<Usuario[]> {
        return this.usuarioService.getAllRelaciones(orden);
    }
    @Get(":id")
    public getByID(@Param("id") id: number): Promise<Usuario> {
        return this.usuarioService.getByID(id);
    }
    @Post()
    public addUsuario(@Body() usuario: UsuarioDTO): Promise<Usuario> {
        return this.usuarioService.addUsuario(usuario);
    }
    @Put(":id")
    public updateUsuario(@Param("id") id: number, @Body() usuario: UsuarioDTO  ): Promise<boolean> {
        return this.usuarioService.updateUsuario(id,usuario);
    }
    @Delete(":id")
    public deleteUsuario(@Param("id") id: number): Promise<boolean> {
        return this.usuarioService.deleteUsuario(id);
    }
}
