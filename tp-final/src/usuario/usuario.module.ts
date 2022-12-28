import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoCompras } from 'src/carrito_compras/carritoCompras.entity';
import { Factura } from 'src/factura/factura.entity';
import { Muro } from 'src/muro/muro.entity';
import Rol from 'src/rol/rol.entity';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Usuario,Muro,Factura,Rol,CarritoCompras
      ]
    )
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
