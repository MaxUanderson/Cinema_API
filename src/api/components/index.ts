import { Router } from 'express';
import { BaseRoutes } from './base/base.routes';
import { ClassificacaoRoutes } from './classificacao/classificacao.routes';
import { ClienteRoutes } from './cliente/cliente.routes';
import { FilmeRoutes } from './filme/filme.routes';
import { Forma_pagamentoRoutes } from './forma_pagamento/forma_pagamento.routes';
import { IngressoRoutes } from './ingresso/ingresso.routes';
import { PoltronaRoutes } from './poltrona/poltrona.routes';
import { SalaRoutes } from './sala/sala.routes';
import { SessaoRoutes } from './sessao/sessao.routes';
import { VendaRoutes } from './venda/venda.routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/classificacao`, new ClassificacaoRoutes().routes());
  router.use(`${prefix}/cliente`, new ClienteRoutes().routes());
  router.use(`${prefix}/filme`, new FilmeRoutes().routes());
  router.use(`${prefix}/forma_pagamento`, new Forma_pagamentoRoutes().routes());
  router.use(`${prefix}/ingresso`, new IngressoRoutes().routes());
  router.use(`${prefix}/poltrona`, new PoltronaRoutes().routes());
  router.use(`${prefix}/sala`, new SalaRoutes().routes());
  router.use(`${prefix}/sessao`, new SessaoRoutes().routes());
  router.use(`${prefix}/venda`, new VendaRoutes().routes());
}
