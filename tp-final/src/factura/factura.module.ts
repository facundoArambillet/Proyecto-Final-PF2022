import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muro } from 'src/muro/muro.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { FacturaController } from './factura.controller';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Factura,Usuario,Muro
      ]
    )
  ],
  controllers: [FacturaController],
  providers: [FacturaService]
})
export class FacturaModule {}
