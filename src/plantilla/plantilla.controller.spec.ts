import { Test, TestingModule } from '@nestjs/testing';
import { PlantillaController } from './plantilla.controller';
import { PlantillaService } from './plantilla.service';

describe('PlantillaController', () => {
  let controller: PlantillaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantillaController],
      providers: [PlantillaService],
    }).compile();

    controller = module.get<PlantillaController>(PlantillaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
