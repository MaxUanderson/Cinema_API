import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Classificacao } from './classificacao.entity';

export class ClassificacaoController {
  public async list(req: Request, res: Response) {

    const classificao = await AppDataSource.manager.find(Classificacao)

    res.status(200).json({ dados: classificao });
  }

  public async create(req: Request, res: Response){
    let nome = req.body.nome;
  

    let desp = new Classificacao();
    desp.nome = nome;
    

    const classificacao_salva = await AppDataSource.manager.save(desp);
    res.status(201).json(classificacao_salva);  
  }
}
