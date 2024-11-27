import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import alunosRouter from './routes/alunos.routes';
import lessonPlanRouter from './routes/lessonPlan.routes';
import courseRouter from './routes/course.routes';
import teacherRouter from "./routes/teacher.routes";
import subjectsRouter from './routes/subjects.routes';
import classesRouter from './routes/classes.routes';
import courseSyllabus from './routes/course-syllabus.routes';
import pedagogoRouter from './routes/pedagogue.routes';
import usuario from './routes/usuario.routes';
import notesRouter from './routes/notes.routes';
import responsibleRouter from './routes/responsible.routes';
import activiesRouter from './routes/activies.routes';
import formRoutes from './routes/form.routes';
import schoolCallRouter from './routes/school-call.routes';
import warningsRouter from './routes/warning.routes';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(teacherRouter);
app.use(alunosRouter);
app.use(classesRouter);
app.use(lessonPlanRouter);
app.use(courseRouter);
app.use(subjectsRouter);
app.use(courseSyllabus);
app.use(pedagogoRouter);
app.use(usuario);
app.use(notesRouter);
app.use(responsibleRouter);
app.use(activiesRouter);
app.use(formRoutes);
app.use(schoolCallRouter);
app.use(warningsRouter);


export default app;
