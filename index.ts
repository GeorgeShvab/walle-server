import express from 'express'
import database from './services/database'
import dotenv from 'dotenv'
import router from './routes'
import cors from 'cors'

dotenv.config()
dotenv.config({ path: '.env.local' })

const PORT = process.env.PORT || 8080

const app = express()

database.then(start).catch(databaseError)

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

function start() {
  app.listen(PORT, () => {
    console.log('Server started successfully on port ' + PORT)
  })
}

function databaseError(e: any) {
  console.log(e)
  console.log('Connection to database failed')
}
