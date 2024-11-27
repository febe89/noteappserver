import express from 'express'
import connectMongoDB from './db/db.js'
import userAuth from './routes/userAuth.js'
import noteRouter from './routes/note.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', userAuth)
app.use('/api/note', noteRouter)

app.listen(8000, () => {
  connectMongoDB()
  console.log('server')
})
