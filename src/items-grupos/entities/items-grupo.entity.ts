import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items_grupos' })
export class ItemsGrupo {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'text', unique: true, nullable: false })
  nombre: string;
}
