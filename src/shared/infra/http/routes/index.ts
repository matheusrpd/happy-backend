import { Router } from 'express';

import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRouter);

export default routes;