import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto';

@Controller('plantilla')
export class PlantillaController {
  constructor(private readonly plantillaService: PlantillaService) {}

  @Post()
  create(@Body() createPlantillaDto: CreatePlantillaDto) {
    return this.plantillaService.create(createPlantillaDto);
  }

  @Get()
  findAll() {
    return this.plantillaService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: number) {
    return this.plantillaService.findOne(+codigo);
  }
}
