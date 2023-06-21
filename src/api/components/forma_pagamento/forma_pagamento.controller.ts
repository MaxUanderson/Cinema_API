import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Forma_pagamento } from './forma_pagamento.entity';
import { validate } from 'class-validator';

export class Forma_pagamentoController {
  public async list(req: Request, res: Response) {

    const forma_pagamento = await AppDataSource.manager.find(Forma_pagamento)

    res.status(200).json({ dados: forma_pagamento });
  }

  public async create(req: Request, res: Response){
    let nome = req.body.nome;
    let ativado = req.body.ativado;
    

    let forma_pagamento = new Forma_pagamento();
    forma_pagamento.nome = nome;
    forma_pagamento.ativado = ativado;

const erros = await validate(forma_pagamento);

if (erros.length > 0) {
  return res.status(400).json(erros);
}

const forma_pagamentosalva = await AppDataSource.manager.save(forma_pagamento);

return res.status(201).json(forma_pagamentosalva);

  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;
  
    const forma_pagamento = await AppDataSource.manager.findOneBy(Forma_pagamento, { id: parseInt(cod) });
  
    if (forma_pagamento == null) {
      return res.status(404).json({ erro: 'Forma de pagamento não encontrada!' });
    }
  
    let { nome, ativado } = req.body;
  
    forma_pagamento.nome = nome;
    forma_pagamento.ativado = ativado;
  
    const forma_pagamento_salva = await AppDataSource.manager.save(forma_pagamento);
  
    return res.json(forma_pagamento_salva);
  }
  
  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;
  
    const forma_pagamento = await AppDataSource.manager.findOneBy(Forma_pagamento, { id: parseInt(cod) });
  
    if (forma_pagamento == null) {
      return res.status(404).json({ erro: 'Forma de pagamento não encontrada!' });
    }
  
    await AppDataSource.manager.delete(Forma_pagamento, forma_pagamento);
  
    return res.status(204).json();
  }
  
  public async show(req: Request, res: Response) {
    const { cod } = req.params;
  
    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }
  
}
