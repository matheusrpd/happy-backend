import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';
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
  }, { abortEarly: false }),
  is(['ROLE_ADMIN']),
  permissionsController.create,
);

export default permissionsRouter;