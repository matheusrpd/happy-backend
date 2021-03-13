import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { 
      name, 
      email,
      password, 
      old_password,
      phone_number,
      cpf,
      birthday,
      country,
      state,
      city,
      neighborhood,
      street,
      street_number,
      zipcode
    } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      userId,
      name,
      email,
      oldPassword: old_password,
      password,
      phone_number,
      cpf,
      birthday,
      country,
      state,
      city,
      neighborhood,
      street,
      street_number,
      zipcode
    });

    return response.json(classToClass(user));
  }
}