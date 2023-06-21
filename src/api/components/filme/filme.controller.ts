import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Filme } from './filme.entity';
import { validate } from 'class-validator';

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
    let classificacao_indicativa = req.body.classificacao_indicativa;
    let duracao = req.body.duracao;

    let filme = new Filme();
    filme.titulo = titulo;
    filme.sinopse = sinopse;
    filme.atores = atores;
    filme.diretor = diretor;
    filme.genero = genero;
    filme.classificacao_indicativa = classificacao_indicativa;
    filme.duracao = duracao;
    
    const erros = await validate(filme);
    if(erros.length > 0) {
      return res.status(400).json(erros);
    }
    
    const filme_salvo = await AppDataSource.manager.save(filme);
    
    return res.status(201).json(filme_salvo);
    
  }

    public async update(req: Request, res: Response) {
      const { cod } = req.params;
    
      const filme = await AppDataSource.manager.findOneBy(Filme, { id: parseInt(cod) });
    
      if (filme == null) {
        return res.status(404).json({ erro: 'Filme não encontrado!' });
      }
    
      let { titulo, sinopse, atores, diretor, genero } = req.body;
    
      filme.titulo = titulo;
      filme.sinopse = sinopse;
      filme.atores = atores;
      filme.diretor = diretor;
      filme.genero = genero;
    
       
      const filme_salvo = await AppDataSource.manager.save(filme);
    
      return res.json(filme_salvo);
    }
    
    public async destroy(req: Request, res: Response) {
      const { cod } = req.params;
    
      const filme = await AppDataSource.manager.findOneBy(Filme, { id: parseInt(cod) });
    
      if (filme == null) {
        return res.status(404).json({ erro: 'Filme não encontrado!' });
      }
    
      await AppDataSource.manager.delete(Filme, filme);
    
      return res.status(204).json();
    }
    
    public async show(req: Request, res: Response) {
      const { cod } = req.params;
    
      if (!Number.isInteger(parseInt(cod))) {
        return res.status(400).json();
      }
    }
} 
  
  

