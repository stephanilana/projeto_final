const pool = require('../config/database');

interface AnswerData {
    studentId: number;
    formId: number;
    questionId: number;
    answer: string;
}

interface UpdatedAnswer {
    answer: string;
}

export class AnswerService {
    async createAnswer(answerData: AnswerData): Promise<{ id: number, studentId: number, formId: number, questionId: number, answer: string }> {
        const { studentId, formId, questionId, answer } = answerData;

        if (!studentId || !formId || !questionId || !answer) {
            throw new Error("Please enter all data correctly!");
        }
        
        const query = `
        INSERT INTO answer (studentId, formId, questionId, answer)
        VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [studentId, formId, questionId, answer]);

        return { id: result.insertId, ...answerData };
    }

    async searchAnswerByStudent(studentId: number): Promise<any[]> {
        if (!studentId) {
            throw new Error('studentId not found');
        }

        const query = `SELECT * FROM answers WHERE studentId = ?`;
        const [rows] = await pool.execute(query, [studentId]);

        return rows;
    }

    async updateAnswer(id: number, updatedData: UpdatedAnswer) {
        const { answer } = updatedData;
        const [existingAnswer] = await pool.execute('SELECT * FROM answers WHERE id = ?', [id]);

        return { id, ...updatedData };
    }

    async deleteAnswer(id: number) {
        const query = 'DELETE FROM answers WHERE id = ?';
        await pool.execute(query, [id]);

        return { message: 'Answer deleted.' };
    }
}
