import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Cliente } from './cliente.entity';
import { validate } from 'class-validator';

export class ClienteController {
  public async list(req: Request, res: Response) {

    const cliente = await AppDataSource.manager.find(Cliente)

    res.status(200).json({ dados: cliente });
  }

  public async create(req: Request, res: Response){
    let {nome, sexo, data_nascimento,cpf ,rg,email,endereco,telefone,  cartao_sus,fator_rh, tipagem_sanguinea} = req.body;
  
   
    let cliente = new Cliente();
  
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

    const erros = await validate(cliente);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }
    
    const cliente_salvo = await AppDataSource.manager.save(cliente);
    
    return res.status(201).json(cliente_salvo);
     
  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;
  
    const cliente = await AppDataSource.manager.findOneBy(Cliente, { id: parseInt(cod) });
  
    if (cliente == null) {
      return res.status(404).json({ erro: 'Cliente não encontrado!' });
    }
  
    let {nome, sexo, data_nascimento,cpf ,rg,email,endereco,telefone,  cartao_sus,fator_rh, tipagem_sanguinea} = req.body;
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
  
   
    const cliente_salvo = await AppDataSource.manager.save(cliente);
  
    return res.json(cliente_salvo);
  }
  
  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;
  
    const cliente = await AppDataSource.manager.findOneBy(Cliente, { id: parseInt(cod) });
  
    if (cliente == null) {
      return res.status(404).json({ erro: 'Cliente não encontrado!' });
    }
  
    await AppDataSource.manager.delete(Cliente, cliente);
  
    return res.status(204).json();
  }
  
  public async show(req: Request, res: Response) {
    const { cod } = req.params;
  
    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }
  
}



