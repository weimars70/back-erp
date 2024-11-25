import { Column, Entity, PrimaryColumn } from 'typeorm';

//@Entity({ name: 'items' })
export class Item {
  @PrimaryColumn()
  item: string;

  @Column({ type: 'text', unique: true, nullable: false })
  descripcion: string;

  @Column({ nullable: false })
  grupo_codigo: number;

  @Column({ nullable: false })
  por_iva: number;

  @Column({ nullable: false })
  por_ganmin: number;

  @Column({ nullable: false })
  por_ganmax: number;

  @Column()
  activo: boolean;

  @Column({ nullable: false })
  item_tipo_iva: number;

  @Column({ nullable: true })
  color: number;

  @Column({ nullable: true })
  ult_pcompra: number;

  @Column({ nullable: true })
  ult_pventa: number;

  @Column({ nullable: true })
  precio_venta2: number;

  @Column({ nullable: true })
  precio_venta3: number;

  @Column()
  promocion: boolean;
}
