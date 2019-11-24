import express from 'express'
import { restaurants } from './restaurants.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const restaurantRoutes = express.Router()

// restaurantRoutes.get('/', asyncWrapper(restaurants.index))
restaurantRoutes.get('/:restaurant_id', asyncWrapper(restaurants.find_restaurant_id))
restaurantRoutes.post('/', asyncWrapper(restaurants.create))
restaurantRoutes.put('/:restaurant_id', asyncWrapper(restaurants.update))
restaurantRoutes.delete('/:restaurant_id', asyncWrapper(restaurants.delete))
restaurantRoutes.get('/', asyncWrapper(restaurants.find_restaurant_coordinates))

export { restaurantRoutes }
