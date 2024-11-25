import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ItemsGruposService } from './items-grupos.service';
import {
  CreateItemsGrupoDto,
  UpdateGrupoItemDto,
} from './dto/create-items-grupo.dto';

@Controller('items-grupos')
export class ItemsGruposController {
  constructor(private readonly itemsGruposService: ItemsGruposService) {}

  @Post()
  create(@Body() createItemsGrupoDto: CreateItemsGrupoDto) {
    return this.itemsGruposService.create(createItemsGrupoDto);
  }

  @Get()
  findAll() {
    return this.itemsGruposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsGruposService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemsGrupoDto: UpdateGrupoItemDto,
  ) {
    return this.itemsGruposService.update(+id, updateItemsGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsGruposService.remove(+id);
  }
}
