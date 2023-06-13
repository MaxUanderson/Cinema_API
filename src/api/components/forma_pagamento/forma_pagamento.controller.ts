import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Forma_pagamento } from './forma_pagamento.entity';

export class Forma_pagamentoController {
  public async list(req: Request, res: Response) {

    const forma_pagamento = await AppDataSource.manager.find(Forma_pagamento)

    res.status(200).json({ dados: forma_pagamento });
  }

  public async create(req: Request, res: Response){
    let nome = req.body.nome;
    let ativado = req.body.ativado;
    

    let forma_pagamento = new Forma_pagamento();
    forma_pagamento.nome = nome;
    forma_pagamento.ativado=ativado;

    const forma_pagamento_salva = await AppDataSource.manager.save(forma_pagamento);
    res.status(201).json(forma_pagamento_salva);

  
  }
}
