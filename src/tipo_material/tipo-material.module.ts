import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMaterialController } from './tipo-material.controller';
import { TipoMaterial } from './tipo-material.entity';
import { TipoMaterialService } from './tipo-material.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        TipoMaterial
      ]
    )
  ],
  controllers: [TipoMaterialController],
  providers: [TipoMaterialService]
})
export class TipoMaterialModule {}
