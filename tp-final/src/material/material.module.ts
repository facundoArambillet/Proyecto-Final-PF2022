import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muro } from 'src/muro/muro.entity';
import { MaterialController } from './material.controller';
import { Material } from './material.entity';
import { MaterialService } from './material.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Material,Muro
      ]
    )
  ],
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule {}
