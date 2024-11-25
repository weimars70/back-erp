import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'proveedores' })
export class Proveedore {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'text', unique: true, nullable: false })
  ident: string;

  @Column({ type: 'text', unique: false, nullable: false })
  nombre: string;

  @Column({ type: 'text', unique: false, nullable: false })
  nombre_comercial: string;

  @Column({ type: 'text', unique: false, nullable: true })
  contacto: string;

  @Column({ type: 'text', unique: false, nullable: false })
  telefono1: string;

  @Column({ type: 'text', unique: false, nullable: false })
  telefono2: string;

  @Column({ type: 'text', unique: false, nullable: false })
  fax: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  fechahora: Date;

  @Column({ type: 'text', unique: false, nullable: false })
  email: string;

  @Column({ type: 'text', unique: false, nullable: true })
  observaciones: string;

  @Column({ type: 'text', unique: false, nullable: false })
  usuario: string;

  @Column({ type: 'text', unique: false, nullable: false })
  direccion: string;

  @Column({ nullable: false })
  tipo_ident: number;
}
