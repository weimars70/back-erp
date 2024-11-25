import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColoresModule } from './colores/colores.module';
import { TallasModule } from './tallas/tallas.module';
import { ItemsGruposModule } from './items-grupos/items-grupos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ItemsModule } from './items/items.module';
import { RolesModule } from './roles/roles.module';
import { PlantillaModule } from './plantilla/plantilla.module';
import { JwtModule } from '@nestjs/jwt';

ConfigModule.forRoot();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5433,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuariosModule,
    ColoresModule,
    TallasModule,
    ItemsGruposModule,
    ProveedoresModule,
    ItemsModule,
    RolesModule,
    PlantillaModule,
    JwtModule.register({
      secret: 'ZXCAsd16#', // Reemplaza con tu secreto
      signOptions: { expiresIn: '1h' }, // Opciones de firma, por ejemplo, tiempo de expiración
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
