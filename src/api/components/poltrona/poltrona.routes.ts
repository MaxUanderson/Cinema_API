import { Router } from 'express';
import { DespesaController } from './poltrona.controller';

export class DespesaRoutes {
  private router: Router = Router();

  private controller: DespesaController;

  constructor() {
    this.controller = new DespesaController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    // this.router.get('/info', this.controller.info);
    this.router.post('/', this.controller.create);
  }

  public routes(): Router {
    return this.router;
  }
}
