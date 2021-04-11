import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      organizationId: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  ensureAuthenticated,
  appointmentsController.create
);

export default appointmentsRouter;