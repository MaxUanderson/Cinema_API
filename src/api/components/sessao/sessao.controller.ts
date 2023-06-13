import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Sessao } from './sessao.entity';

export class SessaoController {
  public async list(req: Request, res: Response) {

    const sessao = await AppDataSource.manager.find(Sessao)

    res.status(200).json({ dados: sessao });
  }

  public async create(req: Request, res: Response){
    let data = req.body.data;
    let horario_inicio = req.body.horario_inicio;
    let horario_fim = req.body.horario_fim;
    let sala_id = req.body.sala_id;
    let filme_id = req.body.filme_id;

    let sessao = new Sessao();
    sessao.data = data;
    sessao.horario_inicio = horario_inicio;
    sessao.horario_fim = horario_fim;
    sessao.sala_id = sala_id;
    sessao.filme_id = filme_id;

    const sessao_salva = await AppDataSource.manager.save(sessao);
    res.status(201).json(sessao_salva);

  
  }
}
