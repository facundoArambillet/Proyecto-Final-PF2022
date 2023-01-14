import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoCompras } from 'src/carrito_compras/carritoCompras.entity';
import { Factura } from 'src/factura/factura.entity';
import { Material } from 'src/material/material.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { MuroController } from './muro.controller';
import { Muro } from './muro.entity';
import { MuroService } from './muro.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Muro,Usuario,Factura,Material,CarritoCompras
      ]
    )
  ],
  controllers: [MuroController],
  providers: [MuroService]
})
export class MuroModule {}
