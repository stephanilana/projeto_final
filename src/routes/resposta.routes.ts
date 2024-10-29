import { RespostaController } from "../controllers/resposta.controller";
import { RespostaService } from "../services/resposta.service";
import { Request, Response, Router } from "express";

const respostaService = new RespostaService();
const respostaController = new RespostaController(respostaService);

const router = Router();

router.post('/respostas', (req, res) => respostaController.criarResposta(req, res));
router.get('/respostas/aluno/:idAluno', (req, res) => respostaController.buscarRespostasPorAluno(req, res));
router.put('/respostas/:id', (req, res) => respostaController.atualizarResposta(req, res));
router.delete('/respostas/:id', (req, res) => respostaController.deletarResposta(req, res));

export default router;