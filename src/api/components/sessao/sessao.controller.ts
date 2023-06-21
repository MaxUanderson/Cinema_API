import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Sessao } from './sessao.entity';
import { validate } from 'class-validator';
import { Sala } from '../sala/sala.entity';
import { Filme } from '../filme/filme.entity';

export class SessaoController {
  public async list(req: Request, res: Response) {

    const sessao = await AppDataSource.manager.find(Sessao)

    res.status(200).json({ dados: sessao });
  }

  public async create(req: Request, res: Response) {
    let data = req.body.data_sessao;
    let horario_inicio = req.body.horario_inicio;
    let horario_fim = req.body.horario_fim;
    let sala_id = req.body.sala;
    let filme_id = req.body.filme;

    if (sala_id === undefined) {
      return res.status(404).json({ erro: 'Sala inexistente1' });
    }
    
    const _sala = await AppDataSource.manager.findOneBy(Sala, { id: sala_id });
    
    if (_sala === null) {
      return res.status(404).json({ erro: 'Sala inexistente2' });
    }

    if (filme_id === undefined) {
      return res.status(404).json({ erro: 'Filme inexistente' });
    }
    
    const _filme = await AppDataSource.manager.findOneBy(Filme, { id: filme_id });
    
    if (_filme === null) {
      return res.status(404).json({ erro: 'Filme inexistente' });
    }
    
    let sessao = new Sessao();
    sessao.data_sessao = data;
    sessao.horario_inicio = horario_inicio;
    sessao.horario_fim = horario_fim;
    sessao.sala = sala_id;
    sessao.filme = filme_id;

    const erros = await validate(sessao);

    if (erros.length > 0) {
      return res.status(400).json(erros);
    }

    const sessao_salva = await AppDataSource.manager.save(sessao);

    return res.status(201).json(sessao_salva);

  }


  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const sessao = await AppDataSource.manager.findOneBy(Sessao, { id: parseInt(cod) });

    if (sessao == null) {
      return res.status(404).json({ erro: 'Sessão não encontrada!' });
    }

    let { data, horario_fim, horario_inicio, sala_id, filme_id } = req.body;

    sessao.data_sessao = data;
    sessao.horario_inicio = horario_inicio;
    sessao.horario_fim = horario_fim;
    sessao.sala = sala_id;
    sessao.filme = filme_id;

    const sessao_salva = await AppDataSource.manager.save(sessao);

    return res.json(sessao_salva);
  }

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const sessao = await AppDataSource.manager.findOneBy(Sessao, { id: parseInt(cod) });

    if (sessao == null) {
      return res.status(404).json({ erro: 'Sessão não encontrada!' });
    }

    await AppDataSource.manager.delete(Sessao, sessao);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }


}
