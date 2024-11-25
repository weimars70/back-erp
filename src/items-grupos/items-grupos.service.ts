import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemsGrupoDto, UpdateGrupoItemDto } from './dto/create-items-grupo.dto';
import { ItemsGrupo } from './entities/items-grupo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class ItemsGruposService {
  constructor(
    @InjectRepository(ItemsGrupo)
    private itemsGruposRepository: Repository<ItemsGrupo>,
  ) {}
  async create(createItemGrupoDto: CreateItemsGrupoDto) {
    const id = createItemGrupoDto.codigo?? 0;

    if (id === 0) {
      const { nombre } = createItemGrupoDto;
      const savecolorDto = { nombre };
      try {
        const result = await this.itemsGruposRepository.save(savecolorDto);

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

  findAll() {
    return this.itemsGruposRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} itemsGrupo`;
  }

  async update(id: number, updateGrupoItemDto: UpdateGrupoItemDto) {
    try {
      const result = await this.itemsGruposRepository.update(
        id,
        updateGrupoItemDto,
      );
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { id: id, ...updateGrupoItemDto };
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

  remove(id: number) {
    return `This action removes a #${id} itemsGrupo`;
  }
}
