import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRolDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const id = createRoleDto.codigo?? 0;

    if (id === 0) {
      const { nombre } = createRoleDto;
      const savecolorDto = { nombre };
      try {
        const result = await this.rolesRepository.save(savecolorDto);

        if (!result) {
          return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
        } else {
          const rpta = { ...result, id: String(result.codigo) };
          return new ResponseApi(
            HttpStatus.ACCEPTED,
            true,
            'Data retornada',
            rpta,
          );
        }
      } catch (error) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, error, error);
      }
    }

  }

  async findAll() {
    try {
      const response = await this.rolesRepository.find();
      return response;
    } catch (error) {
      return new ResponseApi(
        HttpStatus.ACCEPTED,
        true,
        'Data retornada',
        '',
      );
    } 
  }

  findOne(codigo: number) {
    return `This action returns a #${codigo} role`;
  }

  async update(codigo: number, updateRoleDto: UpdateRolDto) {
    try {
      const result = await this.rolesRepository.update(codigo, updateRoleDto);
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { codigo: codigo, ...updateRoleDto };
        return new ResponseApi(
          HttpStatus.ACCEPTED,
          true,
          'Data retornada',
          rpta,
        );
      }
    } catch (error) {
      return new ResponseApi(HttpStatus.ACCEPTED, false, error, error);
    }
  }

  remove(codigo: number) {
    return `This action removes a #${codigo} role`;
  }
}
