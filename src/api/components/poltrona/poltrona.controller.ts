import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Poltrona } from './poltrona.entity';
import { validate } from 'class-validator';
import { Sala } from '../sala/sala.entity';

export class PoltronaController {
  public async list(req: Request, res: Response) {

    const poltrona = await AppDataSource.manager.find(Poltrona)

    res.status(200).json({ dados: poltrona });
  }

  public async create(req: Request, res: Response) {
    let numero = req.body.numero;
    let fileira = req.body.fileira;
    let coordenada = req.body.coordenada;
    let status = req.body.status;
    let sala_id = req.body.sala;

    if (sala_id === undefined) {
      return res.status(404).json({ erro: 'Sala inexistente' });
    }
    
    const _sala = await AppDataSource.manager.findOneBy(Sala, { id: sala_id });
    
    if (_sala === null) {
      return res.status(404).json({ erro: 'Sala inexistente' });
    }
    

    let poltrona = new Poltrona;
    poltrona.numero = numero;
    poltrona.fileira = fileira;
    poltrona.coordenada = coordenada;
    poltrona.status = status;
    poltrona.sala = _sala;

    const erros = await validate(poltrona);

    if (erros.length > 0) {
      return res.status(400).json(erros);
    }

    const poltrona_salva = await AppDataSource.manager.save(poltrona);

    return res.status(201).json(poltrona_salva);

  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const poltrona = await AppDataSource.manager.findOneBy(Poltrona, { id: parseInt(cod) });

    if (poltrona == null) {
      return res.status(404).json({ erro: 'Poltrona não encontrada!' });
    }

    let { numero, status, fileira, coordenadora, sala_id, } = req.body;

    poltrona.numero = numero;
    poltrona.fileira = fileira;
    poltrona.coordenada = coordenadora;
    poltrona.status = status;
    poltrona.sala = sala_id;

    const poltrona_salva = await AppDataSource.manager.save(poltrona);

    return res.json(poltrona_salva);
  }

  public async destroy(req: Request, res: Response) {
    const { cod } = req.params;

    const poltrona = await AppDataSource.manager.findOneBy(Poltrona, { id: parseInt(cod) });

    if (poltrona == null) {
      return res.status(404).json({ erro: 'Poltrona não encontrada!' });
    }

    await AppDataSource.manager.delete(Poltrona, poltrona);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if (!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }
  }

}
