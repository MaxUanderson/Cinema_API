import { Router } from 'express';
import { IngressoController } from './ingresso.controller';

export class IngressoRoutes {
  private router: Router = Router();

  private controller: IngressoController;

  constructor() {
    this.controller = new IngressoController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
    this.router.put('/:cod', this.controller.update);
    this.router.delete('/:cod', this.controller.destroy);
    this.router.get('/:cod', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}
