import { PartialType } from '@nestjs/mapped-types';

export class CreateColoreDto {
  codigo: number | null;
  nombre: string;
}
export class SaveColorDto {
  nombre: string;
}
export class UpdateColoresDto extends PartialType(CreateColoreDto) {
  codigo: number;
  nombre: string;
}
