import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Ingresso } from './ingresso.entity';

export class IngressoController {
  public async list(req: Request, res: Response) {

    const ingresso = await AppDataSource.manager.find(Ingresso)

    res.status(200).json({ dados: ingresso });
  }

  public async create(req: Request, res: Response){
    let codigo = req.body.codigo;
    let valor = req.body.valor;
    let data_hora = req.body.data_hora;
    let sessao_id = req.body.sessao_id;
    let poltrona_id = req.body.poltrona_id;
    

    let ingresso = new Ingresso();
    ingresso.codigo = codigo;
    ingresso.valor = valor;
    ingresso.data_hora = data_hora;
    ingresso.sessao_id = sessao_id;
    ingresso.poltrona_id = poltrona_id;
    


    const ingresso_salva = await AppDataSource.manager.save(ingresso);
    res.status(201).json(ingresso_salva);

  
  }
}
