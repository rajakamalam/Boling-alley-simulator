import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import calculateRouter from './calculateRouter.js'

dotenv.config({ path: '.env' })
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.listen(port, () =>
    console.log(`App running on port ${port}`)
)

app.use('/', calculateRouter)

/*app.get('/', (req, res) => {
    res.send("GET Request Called")
})*/

