import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import { is } from '@modules/users/infra/htpp/middlewares/ensurePermission';
import EmployeeOrphanagesController from '../controllers/EmployeeOrphanagesController';

const employeeOrphanagesRouter = Router();
const upload = multer(uploadConfig);

const employeeOrphanagesController = new EmployeeOrphanagesController();

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
  employeeOrphanagesController.create,
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
  })
);

employeeOrphanagesRouter.put(
  '/:id',  
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_EMPLOYEE']),
  upload.array('images'), 
  employeeOrphanagesController.update,
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
  })
);

export default employeeOrphanagesRouter;