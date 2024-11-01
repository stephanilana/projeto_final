import Router from 'express-promise-router' // Importação padrão
import noteController from '../controllers/notes.controller'

const router = Router()

router.post('/note/:studentId/:activityId', noteController.createNote)
router.put('/note/edit/:studentId/:activityId', noteController.updateNote)
router.delete('/note/delete/:studentId/:activityId', noteController.deleteNote)
router.get('/note/get/:studentId/:activityId', noteController.getNote)
router.get('/note/average/:studentId/:activityId', noteController.getAverage)

export default router
