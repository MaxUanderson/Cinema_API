import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingresso')
export class Ingresso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  codigo!: string;

  @Column()
  valor!: number;

  @Column()
  data_hora!: Date;

  @Column()
  sessao_id!: number;

  @Column()
  poltrona_id!: number;

 }