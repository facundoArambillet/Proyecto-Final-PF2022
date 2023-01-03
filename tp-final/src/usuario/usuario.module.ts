import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoCompras } from 'src/carrito_compras/carritoCompras.entity';
import { Factura } from 'src/factura/factura.entity';
import { Muro } from 'src/muro/muro.entity';
import Rol from 'src/rol/rol.entity';
import { jwtConstanst } from './jwt.constanst';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Usuario,Muro,Factura,Rol,CarritoCompras
      ]
    ),
    JwtModule.register({
      secret: jwtConstanst.secret,
      signOptions: { expiresIn: '24h' },
    })
  ],
  
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtStrategy]
})
export class UsuarioModule {}
