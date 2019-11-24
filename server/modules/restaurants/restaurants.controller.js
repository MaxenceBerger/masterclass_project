import { restaurantModel } from './restaurant.model'
import { httpStatus } from '../../utils/httpStatus'
import { pool } from '../../config/mysqlconnect'
const restaurants = {}

restaurants.index = async (req, res) => {
  let restaurants = await restaurantModel.find({}, { password: 0, __v: 0 })
  return res.json({ data: { restaurants } })
}

restaurants.create = async (req, res) => {
  let data = await restaurantModel.create(req.body)
  let { password, __v, ...restaurant } = data.toObject()
  return res.status(httpStatus.CREATED).json({ data: { restaurant } })
}

restaurants.update = async (req, res) => {
  let restaurant = await restaurantModel.findById(req.params.id)
  if (!restaurant) return res.status(httpStatus.BAD_REQUEST).json({ message: 'restaurant not found' })
  Object.assign(restaurant, req.body)
  await restaurant.save()
  return res.json({ message: 'Record updated' })
}

restaurants.testMysql = async (req, res) => {
  let data = await pool.query('Select * from restaurants')
  return res.json({ data })
}
export { restaurants }
