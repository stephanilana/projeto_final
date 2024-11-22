import Router from "express-promise-router"; // Importação padrão
import teachersController from "../controllers/teacher.controller";

const router = Router();

router.post("/teacher", teachersController.createTeacher);
router.put("/teacher/:idteacher", teachersController.updateTeacher);
router.delete("/teacher/:idteacher", teachersController.deleteTeacher);

export default router;
