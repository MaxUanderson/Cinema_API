import { Router } from 'express';
import { Forma_pagamentoController } from './forma_pagamento.controller';

export class Forma_pagamentoRoutes {
  private router: Router = Router();

  private controller: Forma_pagamentoController;

  constructor() {
    this.controller = new Forma_pagamentoController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    // this.router.get('/info', this.controller.info);
    this.router.post('/', this.controller.create);
    this.router.put('/:cod', this.controller.update);
    this.router.delete('/:cod', this.controller.destroy);
    this.router.get('/:cod', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}
