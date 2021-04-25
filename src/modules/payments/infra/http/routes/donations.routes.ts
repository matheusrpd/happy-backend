import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DonationsController from '../controllers/DonationsRepository';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';

const donationsRouter = Router();
const donationsController = new DonationsController();

donationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      orphanage_id: Joi.string().required(),
      credit_card_id: Joi.string().uuid(),
      amount: Joi.number().required(),
    },
  }, { abortEarly: false }),
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER', 'ROLE_EMPLOYEE']),
  donationsController.create,
);

export default donationsRouter;