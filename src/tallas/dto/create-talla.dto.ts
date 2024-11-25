import { PartialType } from '@nestjs/mapped-types';

export class CreateTallaDto {
  codigo: string | null;
  nombre: string;
}
export class SaveTallaDto {
  codigo: string;
  nombre: string;
}
export class UpdateTallasDto extends PartialType(CreateTallaDto) {
  codigo: string;
  nombre: string;
}
