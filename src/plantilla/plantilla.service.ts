import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
import { Plantilla } from './entities/plantilla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class PlantillaService {

  constructor(
    @InjectRepository(Plantilla)
    private plantillaRepository: Repository<Plantilla>,
  ) {}

  async create(createPlantillaDto: CreatePlantillaDto) {
    //console.log('createPlantillaDto::::',createPlantillaDto.permisos);
    try { 
      const perm = JSON.stringify(createPlantillaDto.permisos);
      const rol = createPlantillaDto.rol ?? -1;
      let query =  ` DELETE FROM plantilla where rol=${rol} `;
      await this.plantillaRepository.query(query);

     
      query =  ` INSERT INTO  plantilla (permisos,rol) VALUES ('${perm}',${rol}) RETURNING codigo `;
      
      const result = await this.plantillaRepository.query(query);
      
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { ...result, codigo: String(result.codigo) };
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

 async findAll() {
    let query =  ` select permisos FROM plantilla  where rol= -1`;
    const result = await this.plantillaRepository.query(query);
    return result;
  }

  async findOne(rol: number) {
    let query =  ` select permisos FROM plantilla  where rol= ${rol}`;
    const result = await this.plantillaRepository.query(query);
    return result;
  }
}


