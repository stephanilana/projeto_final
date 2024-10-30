import Router from 'express-promise-router';
import materiasController from '../controllers/materias.controllers';

const router = Router();

router.post('/materia', materiasController.createMateria);
router.put('/materia/:id', materiasController.updateMateria);
router.delete('/materia/:id', materiasController.deleteMateria);

export default router;
