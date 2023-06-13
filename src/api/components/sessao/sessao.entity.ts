import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessao')
export class Sessao{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  data!: Date;

  @Column()
  horario_inicio!: string;

  @Column()
  horario_fim!: string;

  @Column()
  sala_id!: number;

  @Column()
  filme_id!: number;
 
}