import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import OrphanagesRepository from '@modules/orphanages/infra/typeorm/repositories/OrphanagesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import ICreditCardsRepository from '@modules/payments/repositories/ICreditCardsRepository';
import CreditCardsRepository from '@modules/payments/infra/typeorm/repositories/CreditCardsRepository';

import IDonationsRepository from '@modules/payments/repositories/IDonationsRepository';
import DonationsRepository from '@modules/payments/infra/typeorm/repositories/DonationsRepository';

container.registerSingleton<IOrphanagesRepository>(
  'OrphanagesRepository',
  OrphanagesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ICreditCardsRepository>(
  'CreditCardsRepository',
  CreditCardsRepository,
);

container.registerSingleton<IDonationsRepository>(
  'DonationsRepository',
  DonationsRepository,
);