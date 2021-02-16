import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RolesController from '../controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      permissions: Joi.array().items(Joi.string()).required()
    },
  }),
  rolesController.create,
);

export default rolesRouter;