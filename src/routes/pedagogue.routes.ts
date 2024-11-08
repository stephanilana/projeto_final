import Router from 'express-promise-router';
import pedagogosController from '../controllers/pedagogue.controller';

const router = Router();

router.post('/pedagogos', pedagogosController.createPedagogue);

export default router;
