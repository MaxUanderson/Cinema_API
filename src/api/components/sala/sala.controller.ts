import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Despesa } from './sala.entity';

export class DespesaController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Despesa)

    res.status(200).json({ dados: despesas });
  }

  public async create(req: Request, res: Response){
    let descricao = req.body.descricao;
    let valor = req.body.valor;
    let data = req.body.data;

    let desp = new Despesa();
    desp.descricao = descricao;
    desp.data=data;
    desp.valor=valor;

    const despesa_salva = await AppDataSource.manager.save(desp);
    res.status(201).json(despesa_salva);

  
  }
}
