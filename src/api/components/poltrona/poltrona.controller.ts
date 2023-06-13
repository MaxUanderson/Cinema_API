import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Poltrona } from './poltrona.entity';

export class PoltronaController {
  public async list(req: Request, res: Response) {

    const poltrona = await AppDataSource.manager.find(Poltrona)

    res.status(200).json({ dados: poltrona });
  }

  public async create(req: Request, res: Response){
    let numero= req.body.numero;
    let fileira = req.body.fileira;
    let coordenadora = req.body.coordenadora;
    let status = req.body.status;
    let sala_id = req.body.sala_id;  
    
    let poltrona = new Poltrona;
    poltrona.numero=numero;
    poltrona.fileira = fileira;
    poltrona.coordenadora=coordenadora;
    poltrona.status = status;
    poltrona.sala_id=sala_id;
    
    const poltrona_salva = await AppDataSource.manager.save(poltrona);
    res.status(201).json(poltrona_salva);

  
  }
}
