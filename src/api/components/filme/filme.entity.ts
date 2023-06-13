import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('filme')
export class Filme {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  sinopse!: string;

  @Column()
  atores!: string;

  @Column()
  diretor!: string;

  @Column()
  genero!: string;

  @Column()
  classificacao_indicativa!: string;

  @Column()
  duracao!: Timestamp;
}