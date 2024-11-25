import { PartialType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {
  id: number | 0;
  nombre: string;
  email: string;
  clave: string;
  rol: number;
  usuario: string
}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  nombre: string;
  email: string;
  rol: number;
}
export class SaveUsuarioDto {
  nombre: string;
  email: string;
  clave: string;
  rol: number;
  usuario: string
}
