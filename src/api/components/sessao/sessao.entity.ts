import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsDate, IsString, IsInt, IsDateString } from 'class-validator';
import { Sala } from '../sala/sala.entity';
import { Filme } from '../filme/filme.entity';

@Entity('sessao')
export class Sessao {
@PrimaryGeneratedColumn()
id!: number;

@Column()
@IsNotEmpty({ message: 'A data não pode estar vazia' })
@IsDateString({strict: true})
data_sessao!: Date;

@Column()
@IsNotEmpty({ message: 'O horário de início não pode estar vazio' })
@IsString({ message: 'O horário de início deve ser uma string' })
horario_inicio!: string;

@Column()
@IsNotEmpty({ message: 'O horário de fim não pode estar vazio' })
@IsString({ message: 'O horário de fim deve ser uma string' })
horario_fim!: string;

@ManyToOne(() => Sala, { eager: true })
@JoinColumn({
  name: 'sala_id',
  referencedColumnName: 'id'
})
sala!: Sala;

@ManyToOne(() => Filme, { eager: true })
@JoinColumn({
  name: 'filme_id',
  referencedColumnName: 'id'
})
filme!: Filme;
}