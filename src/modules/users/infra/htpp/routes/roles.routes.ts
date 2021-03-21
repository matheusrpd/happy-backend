import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';

import RolesController from '../controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.get('/', ensureAuthenticated, rolesController.index);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      permissions: Joi.array().items(Joi.string()).required()
    },
  }, { abortEarly: false }),
  is(['ROLE_ADMIN']),
  rolesController.create,
);

export default rolesRouter;