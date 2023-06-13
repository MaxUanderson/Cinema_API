import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('forma_pagamento')
export class Forma_pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  ativado!: number;


}