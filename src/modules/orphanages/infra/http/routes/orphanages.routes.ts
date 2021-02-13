import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const upload = multer(uploadConfig);

const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/dependents', ensureAuthenticated, orphanagesController.getAllNotActives);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.delete('/:id', orphanagesController.delete);

orphanagesRouter.post(
  '/', 
  upload.array('images'), 
  orphanagesController.create,
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

orphanagesRouter.put(
  '/:id', 
  ensureAuthenticated,
  upload.array('images'), 
  orphanagesController.update,
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

export default orphanagesRouter;