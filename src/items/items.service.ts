import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseApi } from 'src/response-api/responseApi';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}
  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
  }
  async findAllCompras() {
    //,por_ganmin,por_ganmax,activo,item_tipo_iva,imagen,color,ult_pcompra,ult_pventa,
    //tallas,precio_venta2,precio_venta3,promocion,0 as discount,1 as quantity 

    const query = `SELECT item ,descripcion,por_iva as vat,ult_pcompra as purchasePrice 
    , ult_pventa as salePrice,0 as discount,1 as quantity   FROM public.items`;

    const result = await this.itemsRepository.query(query);

    if (result.length == 0) {
      return new ResponseApi(HttpStatus.ACCEPTED, false, '', result);
    } else {
      return result;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
