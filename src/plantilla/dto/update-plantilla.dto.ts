import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantillaDto } from './create-plantilla.dto';

export class UpdatePlantillaDto extends PartialType(CreatePlantillaDto) {}
