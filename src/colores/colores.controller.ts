import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColoreDto, UpdateColoresDto } from './dto/create-colore.dto';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}

  @Post()
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get()
  findAll() {
    return this.coloresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coloresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateColoreDto: UpdateColoresDto) {
    return this.coloresService.update(+id, updateColoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloresService.remove(+id);
  }
}
