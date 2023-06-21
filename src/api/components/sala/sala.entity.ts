import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Entity('sala')
export class Sala {
@PrimaryGeneratedColumn()
id!: number;

@Column()
@IsNotEmpty({ message: 'O nome não pode estar vazio' })
nome!: string;

@Column()
@IsNumber({}, { message: 'O número deve ser um valor numérico' })
numero!: number;

@Column()
@IsNotEmpty({ message: 'A capacidade não pode estar vazia' })
@IsNumber({}, { message: 'A capacidade deve ser um valor numérico' })
capacidade!: number;

@Column()
@IsNotEmpty({ message: 'O local não pode estar vazio' })
localizacao!: string;
}