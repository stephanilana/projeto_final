import Router from 'express-promise-router'
import ementaMateriaController from '../controllers/ementaMateria'
 
const router = Router()
 
router.get('/ementas/:id', ementaMateriaController.getEmenta)
router.post('/ementas', ementaMateriaController.createEmenta)
router.put('/ementas/:id', ementaMateriaController.updateEmenta)
router.delete('/ementas/:id', ementaMateriaController.deleteEmenta)
 
export default router