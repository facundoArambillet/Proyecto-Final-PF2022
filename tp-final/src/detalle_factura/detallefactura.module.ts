import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/factura/factura.entity';
import { Muro } from 'src/muro/muro.entity';
import { DetallefacturaController } from './detallefactura.controller';
import DetalleFactura from './detallefactura.entity';
import { DetallefacturaService } from './detallefactura.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        DetalleFactura,Factura,Muro
      ]
    )
  ],
  controllers: [DetallefacturaController],
  providers: [DetallefacturaService]
})
export class DetallefacturaModule {}
