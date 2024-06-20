import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AppRoutes from './src/routes/index.js'

dotenv.config()

const app = express()
const PORT= process.env.PORT
app.use(express.json())
app.use(cors())

app.use(AppRoutes)

app.listen(PORT,()=>console.log(`App is ready in ${PORT}`))

