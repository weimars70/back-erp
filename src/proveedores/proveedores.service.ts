import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedore } from './entities/proveedore.entity';
import { Repository } from 'typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedore)
    private proveedoresRepository: Repository<Proveedore>,
  ) {}

  findAll() {
    return this.proveedoresRepository.find();
  }

  async findAllCompras() {
    const query = `SELECT ident as value, nombre as label from proveedores order by nombre`;
    //WHERE mes=${_params.mes}  AND year=${_params.year} and procesado =${_params.pendientes}

    const result = await this.proveedoresRepository.query(query);
    if (result.length == 0) {
      return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
    } else {
      return result;
    }
  }
  create(createProveedoreDto: CreateProveedoreDto) {
    return 'This action adds a new proveedore';
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
