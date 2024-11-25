import { Test, TestingModule } from '@nestjs/testing';
import { ItemsGruposController } from './items-grupos.controller';
import { ItemsGruposService } from './items-grupos.service';

describe('ItemsGruposController', () => {
  let controller: ItemsGruposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsGruposController],
      providers: [ItemsGruposService],
    }).compile();

    controller = module.get<ItemsGruposController>(ItemsGruposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
