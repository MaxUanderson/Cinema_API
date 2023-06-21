import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';
import { Sala } from '../sala/sala.entity';

@Entity('poltrona')
export class Poltrona {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numero!: number;

  @Column()
  @IsNumber({}, { message: 'A fileira deve ser um número' })
  fileira!: number;

  @Column()
  @IsNotEmpty({ message: 'A coordenada não pode estar vazia' })
  @IsString({ message: 'A coordenada deve ser uma string' })
  coordenada!: string;

  @Column()
  @IsNotEmpty({ message: 'O status não pode estar vazio' })
  @IsString({ message: 'O status deve ser uma string' })
  status!: string;

  @ManyToOne(() => Sala, { eager: true })
  @JoinColumn({
    name: 'sala_id',
    referencedColumnName: 'id'
  })
  sala!: Sala;

}
