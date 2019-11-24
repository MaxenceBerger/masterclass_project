import express from 'express'
import { restaurants } from './restaurants.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { newrestaurant } from './restaurant.validations'

const restaurantRoutes = express.Router()

restaurantRoutes.get('/', asyncWrapper(restaurants.index))
restaurantRoutes.post('/', validate(newrestaurant), asyncWrapper(restaurants.create))
restaurantRoutes.put('/:id', asyncWrapper(restaurants.update))

// This route uses mysql DB for demo purpose to just show how can one use mysql in this app
restaurantRoutes.get('/testmysqlroute', asyncWrapper(restaurants.testMysql))

export { restaurantRoutes }
