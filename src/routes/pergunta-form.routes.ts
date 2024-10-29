import Router from 'express-promise-router'
import formController from '../controllers/pergunta-form.controller'

const router = Router()

router.post('/perguntas', formController.questionForm)
router.post('/perguntas/:id', formController.uptadeQuestions)
export default router
