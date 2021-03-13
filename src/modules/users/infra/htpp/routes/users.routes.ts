import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
      roles: Joi.array().items(Joi.string()).required()
    },
  }),
  usersController.create,
);

export default usersRouter;