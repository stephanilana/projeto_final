import { Request, Response } from "express";
import { AnswerService } from "../services/answer.service";

export class AnswerController {
   private answerService: AnswerService;

   constructor(answerService: AnswerService) {
    this.answerService = answerService;
   }

    async createAnswer(req: Request, res: Response): Promise<void> {
        try {
            const newAnswer = await this.answerService.createAnswer(req.body);
             res.status(201).json(newAnswer);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }

    async searchAnswerByStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentId = Number(req.body.studentId);
            if (isNaN(studentId)) {
                throw new Error("Please provide a valid value");
            }

            const answers = await this.answerService.searchAnswerByStudent(studentId);
             res.status(200).json(answers);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    } 

    async updateAnswer(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.body.id);
            const updatedAnswer = await this.answerService.updateAnswer(id, req.body);
             res.status(200).json(updatedAnswer);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }

    async deleteAnswer(req: Request, res: Response) {
        try {
            const id = Number(req.body.id);
            const message = await this.answerService.deleteAnswer(id);
             res.status(200).json(message);
        } catch (error: any) {
             res.status(400).json({ message: error.message });
        }
    }
}
