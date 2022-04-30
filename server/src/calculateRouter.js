import express from 'express'

import { calculate } from './calculateHandler.js'

const calculateRouter = express.Router()
calculateRouter.post('/', calculate)

export default calculateRouter