import { Module } from '@nestjs/common';
import { ItemsGruposService } from './items-grupos.service';
import { ItemsGruposController } from './items-grupos.controller';
import { ItemsGrupo } from './entities/items-grupo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsGrupo])],
  controllers: [ItemsGruposController],
  providers: [ItemsGruposService],
})
export class ItemsGruposModule {}
