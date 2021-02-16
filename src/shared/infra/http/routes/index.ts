import { Router } from 'express';

import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';
import employeeOrphanagesRouter from '@modules/orphanages/infra/http/routes/employeeOrphanages.routes';
import usersRouter from '@modules/users/infra/htpp/routes/users.routes';
import sessionsRouter from '@modules/users/infra/htpp/routes/sessions.routes';
import profileRouter from '@modules/users/infra/htpp/routes/profile.routes';
import permissionsRouter from '@modules/users/infra/htpp/routes/permissions.routes';
import rolesRouter from '@modules/users/infra/htpp/routes/roles.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/roles', rolesRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/orphanages', employeeOrphanagesRouter, orphanagesRouter);

export default routes;