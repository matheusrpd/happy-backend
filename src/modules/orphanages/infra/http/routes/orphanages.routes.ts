import { Router } from 'express';

import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.get('/:id', orphanagesController.show);

export default orphanagesRouter;