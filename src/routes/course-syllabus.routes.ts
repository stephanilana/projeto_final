import Router from 'express-promise-router'
import courseSyllabusController from '../controllers/course-syllabus.controller'
 
const router = Router()
 
router.get('/Syllabus/:id', courseSyllabusController.getSyllabus)
router.post('/Syllabus', courseSyllabusController.createSyllabus)
router.put('/Syllabus/:id', courseSyllabusController.updateSyllabus)
router.delete('/Syllabus/:id', courseSyllabusController.deleteSyllabus)
 
export default router
