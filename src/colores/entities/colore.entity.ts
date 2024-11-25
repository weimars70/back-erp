import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'colores' })
export class Colore {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'text', unique: true, nullable: false })
  nombre: string;
}
