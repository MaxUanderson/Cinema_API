import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';

@Entity('filme')
export class Filme {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  sinopse!: string;

  @Column()
  @IsNotEmpty()
  atores!: string;

  @Column()
  @IsNotEmpty()
  diretor!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  genero!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsIn(['Livre', '10', '12', '14', '16', '18'])
  classificacao_indicativa!: string;

  @Column()
  duracao!: string;
}
