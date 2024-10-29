import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; 
import alunosRouter from './routes/alunos.routes'; 
import courseRouter from './routes/course.routes';


dotenv.config();

const app = express();

// Configurações do middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors());

// Roteamentos
app.use(alunosRouter);
app.use(courseRouter);
export default app;