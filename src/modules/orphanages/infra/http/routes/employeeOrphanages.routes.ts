import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';

import EmployeeOrphanagesController from '../controllers/EmployeeOrphanagesController';
import AdminOrphanagesController from '../controllers/AdminOrphanagesController';

const employeeOrphanagesRouter = Router();
const upload = multer(uploadConfig);

const employeeOrphanagesController = new EmployeeOrphanagesController();
const adminOrphanagesController = new AdminOrphanagesController();

employeeOrphanagesRouter.get(
  '/dependents',  
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  employeeOrphanagesController.index,
);

employeeOrphanagesRouter.delete(
  '/:id',  
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_EMPLOYEE']),
  employeeOrphanagesController.delete
);

employeeOrphanagesRouter.post(
  '/',  
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_EMPLOYEE']),
  upload.array('images'), 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      about: Joi.string().required(),
      instructions: Joi.string().required(),
      opening_hours: Joi.string().required(),
      open_on_weekends: Joi.boolean().required(),
    },
  }, { abortEarly: false }),
  employeeOrphanagesController.create,
);

employeeOrphanagesRouter.put(
  '/:id',  
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_EMPLOYEE']),
  upload.array('images'), 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      latitude: Joi.string(),
      longitude: Joi.string(),
      about: Joi.string(),
      instructions: Joi.string(),
      opening_hours: Joi.string(),
      open_on_weekends: Joi.boolean(),
    },
  }, { abortEarly: false }),
  employeeOrphanagesController.update,
);

employeeOrphanagesRouter.patch(
  '/:id',  
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      active: Joi.string().required(),
    },
  }),
  adminOrphanagesController.update,
);

export default employeeOrphanagesRouter;