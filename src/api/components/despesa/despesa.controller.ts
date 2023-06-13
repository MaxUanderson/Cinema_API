import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Despesa } from './despesa.entity';

export class DespesaController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Despesa)

    res.status(200).json({ dados: despesas });
  }

  public async create(req: Request, res: Response){
    let despesa = req.body.despesa;
    let descricao = req.body.descricao;
    let data = req.body.data;
    let data_efetivacao = req.body.data_efetivacao;
    let valor = req.body.valor;
    let valor_pago = req.body.valor_pago;
    let pago = req.body.pago;

    let desp = new Despesa();
    desp.descricao = descricao;
    desp.data= data;
    desp.data_efetivacao = data_efetivacao;
    desp.valor=valor;
    desp.valor_pago=valor_pago;
    desp.pago = pago;

    const despesa_salva = await AppDataSource.manager.save(desp);
    res.status(201).json(despesa_salva);

  
  }
}
