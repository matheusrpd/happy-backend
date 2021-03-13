 import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      cpf: Joi.string().required(),
      phone_number: Joi.string().required(),
      birthday: Joi.date().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      neighborhood: Joi.string().required(),
      street: Joi.string().required(),
      street_number: Joi.string().required(),
      zipcode: Joi.string().required(),
    },
  }),
  profileController.update,
);

export default profileRouter;