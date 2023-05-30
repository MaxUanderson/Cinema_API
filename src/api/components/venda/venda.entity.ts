import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('despesas')
export class Despesa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descricao!: string;

  @Column()
  data!: Date;

  @Column()
  data_efetivacao!: Date;

  @Column()
  valor!: number;

  @Column()
  valor_pago!: number;

  @Column()
  pago!: boolean;
}