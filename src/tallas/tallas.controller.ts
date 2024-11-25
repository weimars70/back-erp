import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TallasService } from './tallas.service';
import { CreateTallaDto, UpdateTallasDto } from './dto/create-talla.dto';


@Controller('tallas')
export class TallasController {
  constructor(private readonly tallasService: TallasService) {}

  @Post()
  create(@Body() createTallaDto: CreateTallaDto) {
    return this.tallasService.create(createTallaDto);
  }

  @Get()
  findAll() {
    return this.tallasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tallasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTallaDto: UpdateTallasDto) {
    return this.tallasService.update(id, updateTallaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tallasService.remove(+id);
  }
}
