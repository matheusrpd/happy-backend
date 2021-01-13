import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const upload = multer(uploadConfig);

const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/:id', orphanagesController.show);
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

export default orphanagesRouter;