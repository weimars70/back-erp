import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTallaDto, SaveTallaDto, UpdateTallasDto } from './dto/create-talla.dto';
import { Talla } from './entities/talla.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class TallasService {
  constructor(
    @InjectRepository(Talla)
    private tallasRepository: Repository<Talla>,
  ) {}

  async create(saveTallaDto: SaveTallaDto) {
 
    try {
      const result = await this.tallasRepository.save(saveTallaDto);

      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { ...result, id: String(result.nombre) };
        return new ResponseApi(
          HttpStatus.ACCEPTED,
          true,
          'Data retornada',
          rpta,
        );
      }
    } catch (error) {
      console.log('error: ', error);
      return new ResponseApi(HttpStatus.ACCEPTED, false, error, error);
    }
  }

  findAll() {
    return this.tallasRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} talla`;
  }

  async update(id: string, _updatetallasDto: UpdateTallasDto) {
   
    try {
      const result = await this.tallasRepository.update(id, _updatetallasDto);
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { id: id, ..._updatetallasDto };

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
    return `This action removes a #${id} talla`;
  }
}
