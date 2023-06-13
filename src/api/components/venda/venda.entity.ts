import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  data_hora!: Date;

  @Column()
  situacao!: string;

  @Column()
  ingresso!: string;

  @Column()
  cliente!: string;

  @Column()
  forma_pagamento!: string;

}