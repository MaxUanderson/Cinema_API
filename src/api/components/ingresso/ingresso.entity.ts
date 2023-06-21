import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsInt, IsDateString } from 'class-validator';
import { Sessao } from '../sessao/sessao.entity';
import { Poltrona } from '../poltrona/poltrona.entity';

@Entity('ingresso')
export class Ingresso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'O código não pode estar vazio' })
  @IsString({ message: 'O código deve ser uma string' })
  codigo!: string;

  @Column()
  @IsNumber({}, { message: 'O valor deve ser um número' })
  valor!: number;

  @Column()
  @IsDateString({ })
  data_hora!: Date;

  @ManyToOne(() => Sessao, { eager: true })
  @JoinColumn({
    name: 'sessao_id',
    referencedColumnName: 'id'
  })
  sessao!: Sessao;

  @ManyToOne(() => Poltrona, { eager: true })
  @JoinColumn({
  name: 'poltrona_id',
  referencedColumnName: 'id'
  })
  poltrona!: Poltrona;
  
}
