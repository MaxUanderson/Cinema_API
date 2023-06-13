import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Cliente } from './cliente.entity';

export class ClienteController {
  public async list(req: Request, res: Response) {

    const cliente = await AppDataSource.manager.find(Cliente)

    res.status(200).json({ dados: cliente });
  }

  public async create(req: Request, res: Response){
    let Cliente = req.body.cliente;
    let nome = req.body.nome;
    let sexo = req.body.sexo;
    let data_nascimento = req.body.data_nascimento;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let telefone = req.body.telefone;
    let cartao_sus = req.body.cartao_sus;
    let tipagem_sanguinea = req.body.tipagem_sanguinea;
    let fator_rh = req.body.fator_rh;

    let cliente = new Cliente();
    cliente.cliente = cliente;
    cliente.nome=nome;
    cliente.sexo=sexo;
    cliente.data_nascimento = data_nascimento;
    cliente.cpf = cpf;
    cliente.rg = rg;
    cliente.email = email;
    cliente.endereco = endereco;
    cliente.telefone = telefone;
    cliente.cartao_sus = cartao_sus;
    cliente.tipagem_sanguinea = tipagem_sanguinea;
    cliente.fator_rh = fator_rh;

    const cliente_salva = await AppDataSource.manager.save(cliente);
    res.status(201).json(cliente_salva);
 
  }
}



