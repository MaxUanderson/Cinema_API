import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poltrona')
export class Poltrona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numero!: number;

  @Column()
  fileira!: number;

  @Column()
  coordenadora!: string;

  @Column()
  status!: string;

  @Column()
  sala_id!: number;

}