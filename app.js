import express from 'express'
import errorHandler from './handler/errorHandler.js'
import path from 'path'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import postRouter from './routes/postRoutes.js'


const app = express()

app.use(express.static(path.resolve() + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization, x-auth-token')
    next()
})

// Routes

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/auth', authRouter)

app.use(errorHandler.notFound)



export default app