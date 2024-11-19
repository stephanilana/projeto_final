import Router from 'express-promise-router'
import commentController from '../controllers/coments.controllerr'

const router = Router()

router.post('/comment', commentController.createComment)
router.get('/comments/:activityId', commentController.getComments)
router.patch('/comment/:commentId', commentController.updateComment)
router.delete('/comment/:commentId', commentController.deleteComment)

export default router
