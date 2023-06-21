import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Sala } from './sala.entity';
import { validate } from 'class-validator';

export class SalaController {
  public async list(req: Request, res: Response) {

    const sala = await AppDataSource.manager.find(Sala)

    res.status(200).json({ dados: sala });
  }

  public async create(req: Request, res: Response) {
    let nome = req.body.nome;
    let numero = req.body.numero;
    let capacidade = req.body.capacidade;
    let local = req.body.local;

    let sala = new Sala();
    sala.nome = nome;
    sala.numero = numero;
    sala.capacidade = capacidade;
    sala.localizacao = local;


    const erros = await validate(sala);

    if (erros.length > 0) {
      return res.status(400).json(erros);
    }

    const sala_salva = await AppDataSource.manager.save(sala);

    return res.status(201).json(sala_salva);

  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const sala = await AppDataSource.manager.findOneBy(Sala, { id: parseInt(cod) });

    if (sala == null) {
      return res.status(404).json({ erro: 'Sala não encontrada!' });
    }

    let { nome, numero, capacidade, local } = req.body;

    sala.nome = nome;
    sala.numero = numero;
    sala.capacidade = capacidade;
    sala.localizacao = local;


    const sala_salva = await AppDataSource.manager.save(sala);

    return res.json(sala_salva);
  }

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const sala = await AppDataSource.manager.findOneBy(Sala, { id: parseInt(cod) });

    if (sala == null) {
      return res.status(404).json({ erro: 'Sala não encontrada!' });
    }

    await AppDataSource.manager.delete(Sala, sala);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }

}
