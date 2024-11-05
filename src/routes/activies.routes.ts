import Router from 'express-promise-router'
import activiesController from '../controllers/activies.controller'

const router = Router()

router.post('/activity', activiesController.createActivity)
router.patch('/activity/:activityId', activiesController.updateActivityGrades)
router.get('/activity/:activityId,', activiesController.getActivity)
