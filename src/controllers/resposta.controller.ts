import { Request, Response } from "express";
import { RespostaService } from "../services/resposta.service";

export class RespostaController {
   private respostaService: RespostaService

   constructor(respostaService: RespostaService) {
    this.respostaService = respostaService;
   }

    async criarResposta(req: Request, res: Response ): Promise<void> {
        try {
            const novaResposta = await this.respostaService.criarResposta(req.body);
             res.status(201).json(novaResposta);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }

    async buscarRespostasPorAluno(req: Request , res: Response): Promise<void> {
        try {
            const  idAluno  = Number(req.body.idAluno);
            if (isNaN(idAluno)) {
                throw new Error("Por favor, insira um valor válido")
                
            }

            const respostas = await this.respostaService.buscarRespostaPorAluno(idAluno);
             res.status(200).json(respostas);
        }catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    } 

    async atualizarResposta(req: Request, res: Response):Promise<void> {
        try {
            const  id  = Number(req.body.id);
            const respostaAtualizada = await this.respostaService.atualizarResposta(id, req.body);
             res.status(200).json(respostaAtualizada);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }

    async deletarResposta(req: Request, res: Response) {
        try {
            const  id  = Number(req.body.id);
            const mensagem = await this.respostaService.deletarResposta(id);
             res.status(200).json(mensagem);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }
}
