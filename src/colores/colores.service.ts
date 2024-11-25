import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateColoreDto, UpdateColoresDto } from './dto/create-colore.dto';
import { Colore } from './entities/colore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class ColoresService {
  constructor(
    @InjectRepository(Colore)
    private coloresRepository: Repository<Colore>,
  ) {}
  async create(createColoreDto: CreateColoreDto) {
    
    const id = createColoreDto.codigo?? 0;

    if (id === 0) {
      const { nombre } = createColoreDto;
      const savecolorDto = { nombre };
      try {
        const result = await this.coloresRepository.save(savecolorDto);

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
    return this.coloresRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} colore`;
  }

  async update(id: number, _updateColoresDto: UpdateColoresDto) {
    try {
      const result = await this.coloresRepository.update(id, _updateColoresDto);
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { id: id, ..._updateColoresDto };
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
    return `This action removes a #${id} colore`;
  }
}
