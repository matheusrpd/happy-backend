import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PermissionsController from '../controllers/PermissionsController';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  permissionsController.create,
);

export default permissionsRouter;