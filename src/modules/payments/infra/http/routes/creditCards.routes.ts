import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreditCardsController from '../controllers/CreditCardsController';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';

const creditCardsRouter = Router();
const creditCardsController = new CreditCardsController();

creditCardsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      number: Joi.string().required(),
      cvv: Joi.string().required(),
      expiration_date: Joi.string().required(),
      holder_name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  creditCardsController.create,
);

creditCardsRouter.get(
  '/:id',
  ensureAuthenticated,
  creditCardsController.show,
);

export default creditCardsRouter;