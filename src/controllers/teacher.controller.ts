import { Request, Response } from "express";
import { teacherService } from "../services/teacher.service";

const teachersController = {
  createTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      id_professor,
      nome,
      cpf,
      datanasc,
      email,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento,
    } = req.body;
    try {
      const retorno = await teacherService.createTeacher(
        id_professor,
        nome,
        cpf,
        datanasc,
        email,
        estado,
        rua,
        bairro,
        municipio,
        numero,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento
      );
      if (!retorno) {
        res.status(500).send("Não foi possível cadastrar o professor.");
      } else {
        res.status(200).send(retorno);
      }
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar cadastrar o professor.");
    }
  },

  updateTeacher: async (req: Request, res: Response): Promise<void> => {
    const {
      id_professor,
      nome,
      cpf,
      datanasc,
      email,
      estado,
      rua,
      bairro,
      municipio,
      numero,
      datadeexpedicaorg,
      estadodeexpedicaorg,
      estadonascimento,
      cidadedenascimento,
    } = req.body;
    const id = req.params.id;
    try {
      const ret = await teacherService.updateTeacher(
        id_professor,
        nome,
        cpf,
        datanasc,
        email,
        estado,
        rua,
        bairro,
        municipio,
        numero,
        datadeexpedicaorg,
        estadodeexpedicaorg,
        estadonascimento,
        cidadedenascimento
      );
      if (!ret) {
        res.status(500).send("Não foi possível atualizar o professor.");
      } else {
        res.status(200).send("Atualização realizada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar atualizar o professor.");
    }
  },

  deleteTeacher: async (req: Request, res: Response): Promise<void> => {
    const { idteacher } = req.params;
    try {
      const ret = await teacherService.deleteTeacher(idteacher);
      if (!ret) {
        res.status(500).send("Não foi possível excluir o professor.");
      } else {
        res.status(200).send("Exclusão realizada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      res
        .status(500)
        .send("Ocorreu um erro no servidor ao tentar excluir o professor.");
    }
  },
};

export default teachersController;
