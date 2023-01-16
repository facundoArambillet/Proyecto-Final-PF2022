import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFacturaController } from './detalleFactura.controller';
import { DetalleFactura } from './detalleFactura.entity';
import { DetalleFacturaService } from './detalleFactura.service';

@Module({
    imports : [
        TypeOrmModule.forFeature(
          [
            DetalleFactura
          ]
        )
      ],
      controllers: [DetalleFacturaController],
      providers: [DetalleFacturaService]
    
})
export class DetalleFacturaModule {}
