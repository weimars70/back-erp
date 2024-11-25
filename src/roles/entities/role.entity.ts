import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'text', unique: true, nullable: false })
  nombre: string;
}

