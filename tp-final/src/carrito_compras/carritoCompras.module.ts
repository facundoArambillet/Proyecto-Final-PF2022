import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muro } from 'src/muro/muro.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { CarritoComprasController } from './carritoCompras.controller';
import { CarritoCompras } from './carritoCompras.entity';
import { CarritoComprasService } from './carritoCompras.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        CarritoCompras,Usuario,Muro
      ]
    )
  ],
  controllers: [CarritoComprasController],
  providers: [CarritoComprasService]
})
export class CarritoComprasModule {}
