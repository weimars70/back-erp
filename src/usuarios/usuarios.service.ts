import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseApi } from 'src/response-api/responseApi';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    const id = createUsuarioDto.id?? 0;
    if (id === 0) {
      const { nombre, email, clave,rol,usuario } = createUsuarioDto;
      const saveUsuarioDto = { nombre, email, clave,rol,usuario };
      try {
        const result = await this.usuarioRepository.save(saveUsuarioDto);

        if (!result) {
          return result;
        } else {
          const rpta = { ...result, id: String(result.id) };
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
    } else {
      const { nombre, email, rol } = createUsuarioDto;
      const updateUsuarioDto = { nombre, email, rol };
      return this.update(id, updateUsuarioDto);
    }
  }

  async findAll(_params: any) {
    
    let query = `SELECT a.id, a.nombre, a.email,a.rol,b.nombre as rol_nombre,sucural FROM public.usuario a join roles b on a.rol=b.codigo where 1=1`;
    if (_params) {
      for (let i = 0; i < Object.keys(_params).length; i++) {
        const propiedad = Object.keys(_params)[i];
        if (_params[propiedad] != '' && _params[propiedad] != null) {
          if ( propiedad.toLowerCase() =='rol'){
            query =
            query +
            ` and lower(b.nombre)::text like '%` +
            _params[propiedad].toLowerCase() +
            `%'`;
          }else{
            query =
            query +
            ` and lower(a.` +
            propiedad.toLowerCase()+`::TEXT)::text like '%` +
            _params[propiedad].toLowerCase() +
            `%'`;
          }
         
        }
      }
    }

    query = query + ` order by id `;
    const result = await this.usuarioRepository.query(query);

    if (result.length == 0) {
      return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
    } else {
      return new ResponseApi(
        HttpStatus.ACCEPTED,
        true,
        'Data retornada',
        result,
      );
    }
  }

  async getData() {
    const query = `SELECT a.id, a.nombre, a.email,a.rol,b.nombre as rol_nombre FROM public.usuario a join roles b on a.rol=b.codigo where 1=1 `;
    const result = await this.usuarioRepository.query(query);
    return result;
  }
  async findOne(id: number) {
    const userFound = await this.usuarioRepository.findOneBy({ id: id });
    return userFound;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const result = await this.usuarioRepository.update(id, updateUsuarioDto);
      if (!result) {
        return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
      } else {
        const rpta = { id: id, ...updateUsuarioDto };
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

  async remove(id: number) {
    return await this.usuarioRepository.delete(id);
  }
  async login(loginAuthDto: LoginAuthDto) {
    
    if (!loginAuthDto.username) {
      //return new ResponseApi(HttpStatus.NOT_FOUND, false, 'USUARIO INVALIDO', {});
      return { success: false, message: 'Usuario es requerido' };
    }

    const query = `SELECT id::text as id, nombre, email, clave,usuario,rol,sucursal FROM public.usuario where usuario='${loginAuthDto.username}' limit 1`;

    const result = await this.usuarioRepository.query(query);
   
    if (!result || result.length == 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    if (loginAuthDto.password != result[0].clave) {
      console.log('Clave Incorrecta');
      return { success: false, message: 'Clave Incorrecta' };
    } else {
      const payload = { 
        id: result[0].id, 
        name: result[0].usuario,
       }

      const token = this.jwtService.sign(payload);
      const data = {
        user: result[0].usuario,
        token: token,
        sucursal: result[0].sucursal,
        rol: result[0].rol,
      };

      console.log('Clave Correcta', data);
      return { success: true, message: data };
    }
  }
}
