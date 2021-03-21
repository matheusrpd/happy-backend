import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreditCardsController from '../controllers/CreditCardsController';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';

const creditCardsRouter = Router();
const creditCardsController = new CreditCardsController();

creditCardsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      number: Joi.string().creditCard().required(),
      cvv: Joi.string().length(3).required(),
      expiration_date: Joi.string().length(4).required(),
      holder_name: Joi.string().required(),
    },
  }, { abortEarly: false }),
  ensureAuthenticated,
  is(['ROLE_USER', 'ROLE_EMPLOYEE']),
  creditCardsController.create,
);

creditCardsRouter.get(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_EMPLOYEE']),
  creditCardsController.show,
);

export default creditCardsRouter;