
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';
import { Ingresso } from '../ingresso/ingresso.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Forma_pagamento } from '../forma_pagamento/forma_pagamento.entity';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  @IsNotEmpty({ message: 'A data e hora não pode estar vazia' })
  @IsDateString({ strict: true })
  data_hora!: Date;

  @Column()
  @IsNotEmpty({ message: 'A situação não pode estar vazia' })
  @IsString({ message: 'A situação deve ser uma string' })
  situacao!: string;


  @ManyToOne(() => Ingresso, { eager: true })
  @JoinColumn({
    name: 'ingresso_id',
    referencedColumnName: 'id'
  })
  ingresso!: Ingresso;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({
    name: 'cliente_id',
    referencedColumnName: 'id'
  })
  cliente!: Cliente;

  @ManyToOne(() => Forma_pagamento, { eager: true })
  @JoinColumn({
    name: 'forma_pagamento_id',
    referencedColumnName: 'id'
  })
  forma_pagamento!: Forma_pagamento;

}

