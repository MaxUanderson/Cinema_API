import { Router } from 'express';
import { ClassificacaoController } from './classificacao.controller';

export class ClassificacaoRoutes {
  private router: Router = Router();

  private controller: ClassificacaoController;

  constructor() {
    this.controller = new ClassificacaoController();
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
