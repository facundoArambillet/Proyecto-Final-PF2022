import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';


import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import UsuarioDTO from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
    private usuarios: Usuario[] = [];

    constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService) { }

    public async getAll(): Promise<Usuario[]> {
        this.usuarios = await this.usuarioRepository.find();
        return this.usuarios;
    }

    public async getAllRelaciones(orden : string): Promise<Usuario[]> {
        let criterio: FindManyOptions = {relations: ["muros","facturas","rol","carritosCompras"], order : {
            idUsuario : orden
        }}
        this.usuarios = await this.usuarioRepository.find(criterio);
        return this.usuarios;
    }

    public async getByEmail(email: string): Promise<Usuario> {
        try {
            let criterio: FindOneOptions = { where: { nombre: email } };
            let usuario: Usuario = await this.usuarioRepository.findOne(criterio);
            if (usuario) {
                return usuario;
            }
            else {
                throw new Error("El usuario no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de usuario ${email}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async getByIDRelaciones(idUsuario: number): Promise<Usuario> {
        try {
            let criterio: FindOneOptions = { where: { idUsuario: idUsuario }, relations: ["muros","facturas","rol","carritosCompras"] };
            let usuario: Usuario = await this.usuarioRepository.findOne(criterio);
            if (usuario) {
                return usuario;
            }
            else {
                throw new Error("El usuario no se encuentra");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de usuario ${idUsuario}: ${error}` },
                HttpStatus.NOT_FOUND);
        }


    }

    public async addUsuario(usuarioDTO: UsuarioDTO): Promise<Usuario> {
        try {
            if (usuarioDTO) {
                if (usuarioDTO.nombre && usuarioDTO.contrasenia && usuarioDTO.rolIdRol) {
                    usuarioDTO.contrasenia = await hash(usuarioDTO.contrasenia,10) // ENCRIPTACION DE CONTRASEÑA
                    let usuario = await this.usuarioRepository.save(new Usuario(usuarioDTO.nombre, usuarioDTO.contrasenia, usuarioDTO.rolIdRol));
                    
                    return usuario;
                }
                else {
                    throw new Error("Datos de usuario invalidos");
                }
            }
            else {
                throw new Error("Usuario invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la creacion de usuario: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async loginUsuario(usuarioDTO: UsuarioDTO) {
        try {
            if(usuarioDTO) {
                if (usuarioDTO.nombre && usuarioDTO.contrasenia) {
                    let criterio: FindOneOptions = { where: { nombre: usuarioDTO.nombre } };
                    let usuario: Usuario = await this.usuarioRepository.findOne(criterio);
                    if(usuario) {
                        let verificacionContrasenia = await compare(usuarioDTO.contrasenia, usuario.getContrasenia())
                        if(verificacionContrasenia) {
                            let payload = {
                                "id": usuario.getID(),
                                "nombre": usuario.getNombre(),
                                "rol": usuario.getRol()
                            }
                            let token = this.jwtService.sign(payload);
                            
                            let data = {
                                usuario: usuario,
                                token,
                            }
                            return data ;
                        }
                        else {
                            throw new Error("Contraseña invalida");
                        }

                    }
                    else {
                        throw new Error("Usuario no encontrado");
                    }
                }
                else {
                    throw new Error("Datos de usuario invalidos");
                }
            }
            else {
                throw new Error("Usuario invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de usuario ${usuarioDTO.nombre}: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
    // public async decodificarToken(usuario : any) {
    //    return this.jwtService.decode(usuario.token: string, options: DecodeOptions)
    // }
    public async updateUsuario(id: number, usuarioDTO: UsuarioDTO): Promise<boolean> {
        try {
            if (id && usuarioDTO) {
                if (usuarioDTO.nombre, usuarioDTO.contrasenia, usuarioDTO.rolIdRol) {
                    let criterio: FindOneOptions = { where: { idUsuario: id } };
                    let usuario: Usuario = await this.usuarioRepository.findOne(criterio);
                    usuario.setNombre(usuarioDTO.nombre);
                    usuario.setContrasenia(usuarioDTO.contrasenia);
                    usuario = await this.usuarioRepository.save(usuario);
                    return true
                }
                else {
                    throw new Error("Datos de usuario invalidos");
                }
            }
            else {
                throw new Error("id o usuario Invalido");
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la actualizacion de usuario: ${error}` },
                HttpStatus.NOT_FOUND);
        }
    }

    public async deleteUsuario(id: number): Promise<boolean> {
        try {
            if (id) {
                let criterio: FindOneOptions = { where: { idUsuario: id } };
                let usuario: Usuario = await this.usuarioRepository.findOne(criterio);
                await this.usuarioRepository.delete(usuario.getID());
                return true;
            }
            else {
                throw new Error("id invalido");
            }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la eliminacion de usuario: ${error}` },
            HttpStatus.NOT_FOUND);
        }
    }
}
