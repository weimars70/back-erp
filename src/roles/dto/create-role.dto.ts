import { PartialType } from '@nestjs/mapped-types';

export class CreateRoleDto {
  codigo: number | null;
  nombre: string;
}
export class SaveRolDto {
  nombre: string;
}
export class UpdateRolDto extends PartialType(CreateRoleDto) {
  codigo: number;
  nombre: string;
}

