import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Venda } from './venda.entity';
import { validate } from 'class-validator';
import { Ingresso } from '../ingresso/ingresso.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Forma_pagamento } from '../forma_pagamento/forma_pagamento.entity';

export class VendaController {
  public async list(req: Request, res: Response) {

    const venda = await AppDataSource.manager.find(Venda)

    res.status(200).json({ dados: venda });
  }

  public async create(req: Request, res: Response) {

    let ingresso = req.body.ingresso;
    let cliente = req.body.cliente;
    let forma_pagamento = req.body.forma_pagamento;

    if (ingresso === undefined) {
      return res.status(404).json({ erro: 'Ingresso inexistente' });
    }
    
    const _ingresso = await AppDataSource.manager.findOneBy(Ingresso, { id: ingresso });
    
    if (_ingresso === null) {
      return res.status(404).json({ erro: 'Ingresso inexistente' });
    }

    if (cliente === undefined) {
      return res.status(404).json({ erro: 'Cliente inexistente' });
    }
    
    const _cliente = await AppDataSource.manager.findOneBy(Cliente, { id: cliente });
    
    if (_cliente === null) {
      return res.status(404).json({ erro: 'Cliente inexistente' });
    }
    
    if (forma_pagamento === undefined) {
      return res.status(404).json({ erro: 'Forma de pagamento inexistente' });
    }
    
    const _forma_pagamento = await AppDataSource.manager.findOneBy(Forma_pagamento, { id: forma_pagamento });
    
    if (_forma_pagamento === null) {
      return res.status(404).json({ erro: 'Forma de pagamento inexistente' });
    }
    
    

    let venda = new Venda();
    venda.valor = _ingresso.valor;
    venda.data_hora = new Date();
    venda.situacao = 'pendente';
    venda.ingresso = _ingresso;
    venda.cliente = _cliente;
    venda.forma_pagamento = _forma_pagamento;

    const venda_salva = await AppDataSource.manager.save(venda);
    res.status(201).json(venda_salva);
  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const venda = await AppDataSource.manager.findOneBy(Venda, { id: parseInt(cod) });

    if (venda == null) {
      return res.status(404).json({ erro: 'Venda não encontrada!' });
    }

    

    let { valor, situacao, ingresso, cliente, forma_pagamento, data} = req.body;

    if (ingresso === undefined) {
      return res.status(404).json({ erro: 'Ingresso inexistente' });
    }
    
    const _ingresso = await AppDataSource.manager.findOneBy(Ingresso, { id: ingresso });
    
    if (_ingresso === null) {
      return res.status(404).json({ erro: 'Ingresso inexistente' });
    }

    if (cliente === undefined) {
      return res.status(404).json({ erro: 'Cliente inexistente' });
    }
    
    const _cliente = await AppDataSource.manager.findOneBy(Cliente, { id: cliente });
    
    if (_cliente === null) {
      return res.status(404).json({ erro: 'Cliente inexistente' });
    }
    
    if (forma_pagamento === undefined) {
      return res.status(404).json({ erro: 'Forma de pagamento inexistente' });
    }
    
    const _forma_pagamento = await AppDataSource.manager.findOneBy(Forma_pagamento, { id: forma_pagamento });
    
    if (_forma_pagamento === null) {
      return res.status(404).json({ erro: 'Forma de pagamento inexistente' });
    }
    

    venda.valor = valor;
    venda.data_hora = data;
    venda.situacao = situacao;
    venda.ingresso = _ingresso;
    venda.cliente = _cliente;
    venda.forma_pagamento = _forma_pagamento;

    const erros = await validate(venda);

    if (erros.length > 0) {
      return res.status(400).json(erros);
    }

    const venda_salva = await AppDataSource.manager.save(venda);

    return res.status(201).json(venda_salva);

  }
  

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const venda = await AppDataSource.manager.findOneBy(Venda, { id: parseInt(cod) });

    if (venda == null) {
      return res.status(404).json({ erro: 'Venda não encontrada!' });
    }

    await AppDataSource.manager.delete(Venda, venda);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }


    
  }

}
