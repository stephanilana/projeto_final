import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import alunosRouter from './routes/alunos.routes'
import lessonPlanRouter from './routes/lessonPlan.routes'
import courseRouter from './routes/course.routes'
import subjectsRouter from './routes/subjects.routes'
import classesRouter from './routes/classes.routes'
import courseSyllabus from './routes/course-syllabus.routes'

dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(cors())

// Roteamentos

app.use(alunosRouter)
app.use(classesRouter)
app.use(alunosRouter)
app.use(lessonPlanRouter)
app.use(courseRouter)
app.use(subjectsRouter)
app.use(courseSyllabus)

export default app
