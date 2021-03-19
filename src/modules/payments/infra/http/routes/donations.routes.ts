import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DonationsController from '../controllers/DonationsRepository';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';

const donationsRouter = Router();
const donationsController = new DonationsController();

donationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      orphanage_id: Joi.string().required(),
      credit_card_id: Joi.string().required(),
      amount: Joi.number().required(),
    },
  }, { abortEarly: false }),
  ensureAuthenticated,
  donationsController.create,
);


export default donationsRouter;