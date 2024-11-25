import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tallas' })
export class Talla {
  @PrimaryColumn()
  codigo: string;

  @Column({ type: 'text', unique: true, nullable: false })
  nombre: string;
}
