import { Module } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { PlantillaController } from './plantilla.controller';
import { Plantilla } from './entities/plantilla.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plantilla])],
  controllers: [PlantillaController],
  providers: [PlantillaService],
})
export class PlantillaModule {}
