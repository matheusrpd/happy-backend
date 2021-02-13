import { Router } from 'express';

import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';
import usersRouter from '@modules/users/infra/htpp/routes/users.routes';
import sessionsRouter from '@modules/users/infra/htpp/routes/sessions.routes';
import profileRouter from '@modules/users/infra/htpp/routes/profile.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/orphanages', orphanagesRouter);

export default routes;