import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRolDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.rolesService.findOne(+codigo);
  }

  @Put(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateRoleDto: UpdateRolDto) {
    return this.rolesService.update(+codigo, updateRoleDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.rolesService.remove(+codigo);
  }
}
