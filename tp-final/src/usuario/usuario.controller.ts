import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import UsuarioDTO from './usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService : UsuarioService){}

  // @UseGuards(JwtGuard)
    @Get()
    public getAll(): Promise<Usuario[]> {
        return this.usuarioService.getAll();
    }
    @Get("all/:orden")
    public getAllRelaciones(@Param("orden") orden: string): Promise<Usuario[]> {
        return this.usuarioService.getAllRelaciones(orden);
    }
    @Get("/all/id/:id")
    public getByIDRelaciones(@Param("id") id: number): Promise<Usuario> {
        return this.usuarioService.getByIDRelaciones(id);
    }
    @Get(":email")
    public getByEmail(@Param("email") email: string): Promise<Usuario> {
        return this.usuarioService.getByEmail(email);
    }
    @Post()
    public addUsuario(@Body() usuario: UsuarioDTO): Promise<Usuario> {
        return this.usuarioService.addUsuario(usuario);
    }
    @Post("login")
    public loginUsuario(@Body() usuario: UsuarioDTO) {
        return this.usuarioService.loginUsuario(usuario)
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
