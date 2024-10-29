import Router from 'express-promise-router'
import turmasController from '../controllers/turmas.controller'

const router = Router()

router.post('/turmas', turmasController.createTurma)
router.put('/turmas', turmasController.updateTurma)
router.delete('/turmas', turmasController.deleteTurma)

export default router
