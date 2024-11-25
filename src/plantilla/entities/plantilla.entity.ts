import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'plantilla' })
export class Plantilla {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'text' }) // 'jsonb' es un tipo de datos común para JSON en PostgreSQL
  permisos: string;

  @Column({ nullable: false, default: -1  })
  rol: number;
}
