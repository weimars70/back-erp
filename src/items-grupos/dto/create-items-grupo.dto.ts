import { PartialType } from '@nestjs/mapped-types';

export class CreateItemsGrupoDto {
  codigo: number | null;
  nombre: string;
}
export class SaveItemGrupoDto {
  nombre: string;
}
export class UpdateGrupoItemDto extends PartialType(CreateItemsGrupoDto) {
  codigo: number;
  nombre: string;
}
