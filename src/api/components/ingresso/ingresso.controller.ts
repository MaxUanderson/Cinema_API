import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { validate } from 'class-validator';
import { Sessao } from '../sessao/sessao.entity';
import { Poltrona } from '../poltrona/poltrona.entity';
import { Ingresso } from './ingresso.entity';

export class IngressoController {
  public async list(req: Request, res: Response) {

    const ingresso = await AppDataSource.manager.find(Ingresso)

    res.status(200).json({ dados: ingresso });
  }

  public async create(req: Request, res: Response) {
    let codigo = req.body.codigo;
    let valor = req.body.valor;
    let data_hora = req.body.data_hora;
    let sessao_id = req.body.sessao;
    let poltrona_id = req.body.poltrona;

    if(sessao_id == undefined) {
      return res.status(404).json({ erro: 'Sessão inexistente'})
    }

    const _sessao = await AppDataSource.manager.findOneBy(Sessao, { id: sessao_id });

    if(_sessao == null) {
      return res.status(404).json({ erro: 'Sessão inexistente'})
    }

    if (poltrona_id === undefined) {
      return res.status(404).json({ erro: 'Poltrona inexistente' });
    }
    
    const _poltrona = await AppDataSource.manager.findOneBy(Poltrona, { id: poltrona_id });
    
    if (_poltrona === null) {
      return res.status(404).json({ erro: 'Poltrona inexistente' });
    }
    


    let ingresso = new Ingresso();
    ingresso.codigo = codigo;
    ingresso.valor = valor;
    ingresso.data_hora = data_hora;
    ingresso.sessao = sessao_id;
    ingresso.poltrona = poltrona_id;

    const erros = await validate(ingresso);

    if (erros.length > 0) {
      return res.status(400).json(erros);
    }

    const ingresso_salvo = await AppDataSource.manager.save(ingresso);

    return res.status(201).json(ingresso_salvo);
  }


  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const ingresso = await AppDataSource.manager.findOneBy(Ingresso, { id: parseInt(cod) });

    if (ingresso == null) {
      return res.status(404).json({ erro: 'Ingresso não encontrado!' });
    }

    let { codigo, valor, data_hora, sessao_id, poltrona_id } = req.body;

    ingresso.codigo = codigo;
    ingresso.valor = valor;
    ingresso.data_hora = data_hora;
    ingresso.sessao = sessao_id;
    ingresso.poltrona = poltrona_id;


    const ingresso_salvo = await AppDataSource.manager.save(ingresso);

    return res.json(ingresso_salvo);
  }

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const ingresso = await AppDataSource.manager.findOneBy(Ingresso, { id: parseInt(cod) });

    if (ingresso == null) {
      return res.status(404).json({ erro: 'Ingresso não encontrado!' });
    }

    await AppDataSource.manager.delete(Ingresso, ingresso);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }

}
