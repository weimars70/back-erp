import { Test, TestingModule } from '@nestjs/testing';
import { TallasController } from './tallas.controller';
import { TallasService } from './tallas.service';

describe('TallasController', () => {
  let controller: TallasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TallasController],
      providers: [TallasService],
    }).compile();

    controller = module.get<TallasController>(TallasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
