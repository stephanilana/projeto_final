import Router from 'express-promise-router';
import pedagogosController from '../controllers/pedagogue.controller';

const router = Router();

router.post('/pedagogo', pedagogosController.createPedagogue);
router.put('/pedagogo/:id', pedagogosController.updatePedagogue);
router.delete('/pedagogo/:id', pedagogosController.deletePedagogue);
router.get('/pedagogo/:id', pedagogosController.getPedagogue);

export default router;
