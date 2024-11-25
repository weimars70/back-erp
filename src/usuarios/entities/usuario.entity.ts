import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  clave: string;

  @Column({ nullable: false })
  rol: number

  @Column({ nullable: false })
  sucursal: number
}
