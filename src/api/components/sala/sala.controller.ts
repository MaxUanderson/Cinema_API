import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Sala } from './sala.entity';

export class SalaController {
  public async list(req: Request, res: Response) {

    const sala = await AppDataSource.manager.find(Sala)

    res.status(200).json({ dados: Sala });
  }

  public async create(req: Request, res: Response){
    let nome = req.body.nome;
    let numero = req.body.numero;
    let capacidade = req.body.capacidade;
    let local = req.body.local;

    let sala = new Sala();
    sala.nome = nome;
    sala.numero=numero;
    sala.capacidade=capacidade;
    sala.local=local;

    const sala_salva = await AppDataSource.manager.save(sala);
    res.status(201).json(sala_salva);

  
  }
}
