import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoCompras } from 'src/carrito_compras/carritoCompras.entity';
import DetalleFactura from 'src/detalle_factura/detallefactura.entity';
import { Material } from 'src/material/material.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { MuroController } from './muro.controller';
import { Muro } from './muro.entity';
import { MuroService } from './muro.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Muro,Usuario,Material,DetalleFactura,CarritoCompras
      ]
    )
  ],
  controllers: [MuroController],
  providers: [MuroService]
})
export class MuroModule {}
