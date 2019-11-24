import { restaurantModel } from './restaurant.model'
import { httpStatus } from '../../utils/httpStatus'
const restaurants = {}

restaurants.index = async (req, res) => {
  let restaurants = await restaurantModel.find()
  return res.json(restaurants)
}

restaurants.find_restaurant_id = async (req, res) => {
  let restaurants = await restaurantModel.findById(req.params.restaurant_id)
  return res.json(restaurants)
}

restaurants.create = async (req, res) => {
  let restaurant = await restaurantModel.create(req.body)
  return res.status(httpStatus.CREATED).json(restaurant)
}

restaurants.update = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.restaurant_id)
  if (!restaurant) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Restaurant not found' })
  Object.assign(restaurant, req.body)
  await restaurant.save()
  return res.json(restaurant)
}

restaurants.delete = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.restaurant_id)
  if (!restaurant) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Restaurant not found' })
  await restaurant.delete()
  return res.json({ message: 'Restaurant is deleted' })
}

restaurants.find_restaurant_coordinates = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { long_coordinates, lat_coordinates, max_distance } = req.query;
  let restaurant = await restaurantModel.find(
    {
      location:
          {
            $near:
                {
                  $geometry:
                      {
                        type: 'Point',
                        coordinates:
                        // eslint-disable-next-line camelcase
                            [long_coordinates, lat_coordinates]
                      },
                  $maxDistance: max_distance
                }
          }
    }
  )
  return res.json(restaurant)
}

export { restaurants }
