import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, IsDate, IsPhoneNumber, IsAlpha, Length, IsDateString } from 'class-validator';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome!: string;

  @Column()
  @IsNotEmpty({ message: 'O sexo não pode estar vazio' })
  @IsAlpha()
  sexo!: string;

  @Column()
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia' })
  @IsDateString({  })
  data_nascimento!: Date;

  @Column()
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  @IsString({ message: 'O CPF deve ser uma string' })
  cpf!: string;

  @Column()
  @IsNotEmpty({ message: 'O RG não pode estar vazio' })
  @IsString({ message: 'O RG deve ser uma string' })
  rg!: string;

  @Column()
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email!: string;

  @Column()
  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  endereco!: string;

  @Column()
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  telefone!: string;

  @Column()
  @IsNotEmpty({ message: 'O cartão SUS não pode estar vazio' })
  @IsString({ message: 'O cartão SUS deve ser uma string' })
  cartao_sus!: string;

  @Column()
  @IsNotEmpty({ message: 'A tipagem sanguínea não pode estar vazia' })
  @IsString({ message: 'A tipagem sanguínea deve ser uma string' })
  tipagem_sanguinea!: string;

  @Column()
  @IsNotEmpty({ message: 'O fator RH não pode estar vazio' })
  @IsString({ message: 'O fator RH deve ser uma string' })
  fator_rh!: string;
}
