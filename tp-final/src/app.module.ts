import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialModule } from './material/material.module';
import { MuroModule } from './muro/muro.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TipoMaterialModule } from './tipo_material/tipo-material.module';
import { FacturaModule } from './factura/factura.module';
import { RolModule } from './rol/rol.module';
import { CarritoComprasModule } from './carrito_compras/carritoCompras.module';
import { DetalleFacturaController } from './detalle_factura/detalleFactura.controller';
import { DetalleFacturaService } from './detalle_factura/detalleFactura.service';
import { DetalleFacturaModule } from './detalle_factura/detalleFactura.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "client") }),
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "123456789",
        "database": "tpfinalpfs2022",
        "entities": [
          "dist/**/**.entity{.ts,.js}"
        ],
        "synchronize": false
      }),
    MaterialModule,
    MuroModule,
    UsuarioModule,
    TipoMaterialModule,
    FacturaModule,
    RolModule,
    CarritoComprasModule,
    DetalleFacturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }