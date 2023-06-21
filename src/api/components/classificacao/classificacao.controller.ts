import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Classificacao } from './classificacao.entity';
import { validate } from 'class-validator';

export class ClassificacaoController {
  public async list(req: Request, res: Response) {

    const classificao = await AppDataSource.manager.find(Classificacao)

    res.status(200).json({ dados: classificao });
  }

  public async create(req: Request, res: Response){
    let nome = req.body.nome;

    let classificacao = new Classificacao();
    classificacao.nome = nome;

    const erros = await validate(classificacao);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const classificacao_salva = await AppDataSource.manager.save(classificacao);

    return res.status(201).json(classificacao_salva);
  }
    

    public async update(req: Request, res: Response) {
    const { cod } = req.params;
  
    const classificacao = await AppDataSource.manager.findOneBy(Classificacao, { id: parseInt(cod) });
  
    if (classificacao == null) {
      return res.status(404).json({ erro: 'Classificação não encontrada!' });
    }
  
    let nome = req.body.nome;
  
    classificacao.nome = nome;
  
  
    const classificacao_salva = await AppDataSource.manager.save(classificacao);
  
    return res.json(classificacao_salva);
  }
  
  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;
  
    const classificacao = await AppDataSource.manager.findOneBy(Classificacao, { id: parseInt(cod) });
  
    if (classificacao == null) {
      return res.status(404).json({ erro: 'Classificação não encontrada!' });
    }
  
    await AppDataSource.manager.delete(Classificacao, classificacao);
  
    return res.status(204).json();
  }
  
  public async show(req: Request, res: Response) {
    const { cod } = req.params;
  
    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }
  
}
