import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { httpStatus } from './utils/httpStatus'
import { AppError } from './utils/appError'

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use('/', Router)

// Handle 404
app.use(function (req, res, next) {
  throw new AppError('Resource not found', httpStatus.NOT_FOUND)
})

if (process.env.USE_MONGODB === 'true') connectMongo()

app.use(errorHandler)

export { app }
