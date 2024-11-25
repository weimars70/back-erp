import { Test, TestingModule } from '@nestjs/testing';
import { ItemsGruposService } from './items-grupos.service';

describe('ItemsGruposService', () => {
  let service: ItemsGruposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsGruposService],
    }).compile();

    service = module.get<ItemsGruposService>(ItemsGruposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
