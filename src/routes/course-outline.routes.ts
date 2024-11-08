import Router from 'express-promise-router';
import courseOutlineController from '../controllers/course-outline.controller';

const router = Router();

router.get('/outline/:id', courseOutlineController.getOutline);
router.post('/outline', courseOutlineController.createOutline);
router.put('/outline/:id', courseOutlineController.updateOutline);
router.delete('/outline/:id', courseOutlineController.deleteOutline);

export default router;
