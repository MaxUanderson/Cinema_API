import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Entity('forma_pagamento')
export class Forma_pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome!: string;

  @Column()
  @IsNumber({}, { message: 'O valor de ativado deve ser um número' })
  ativado!: number;
}
