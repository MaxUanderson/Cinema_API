import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sala')
export class Sala {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  numero!: number;

  @Column()
  capacidade!: string;

  @Column()
  local!: string;

  
}