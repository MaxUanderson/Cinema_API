import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Filme } from './filme.entity';

export class FilmeController {
  public async list(req: Request, res: Response) {

    const filme = await AppDataSource.manager.find(Filme)

    res.status(200).json({ dados: filme });
  }

  public async create(req: Request, res: Response){
    let titulo = req.body.titulo;
    let sinopse = req.body.sinopse;
    let atores = req.body.atores;
    let diretor = req.body.diretor;
    let genero = req.body.genero;

    let filme = new Filme();
    filme.titulo = titulo;
    filme.sinopse = sinopse;
    filme.atores = atores;
    filme.diretor = diretor;
    filme.genero = genero;

    const filme_salva = await AppDataSource.manager.save(filme);
    res.status(201).json(filme_salva);

  
  }
}
