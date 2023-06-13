import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Venda } from './venda.entity';

export class VendaController {
  public async list(req: Request, res: Response) {

    const venda = await AppDataSource.manager.find(Venda)

    res.status(200).json({ dados: venda });
  }

  public async create(req: Request, res: Response){
    let valor = req.body.valor;
    let data_hora = req.body.data_hora;
    let situacao = req.body.situacao;
    let ingresso = req.body.ingresso;
    let cliente = req.body.cliente;
    let forma_pagamento = req.body.forma_pagamento;

    let venda = new Venda();
    venda.valor = valor;
    venda.data_hora=data_hora;
    venda.situacao=situacao;
    venda.ingresso = ingresso;
    venda.cliente=cliente;
    venda.forma_pagamento=forma_pagamento;

    const venda_salva = await AppDataSource.manager.save(venda);
    res.status(201).json(venda_salva);

  
  }
}
