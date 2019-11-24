import mongoose from 'mongoose'

const { Schema } = mongoose

const restaurantSchema = new Schema(
  {
    location: {
      coordinates: [ Number, Number ],
      type: { type: String }
    },
    name: { type: String }
  },
  { versionKey: false }
)

const restaurantModel = mongoose.model('Restaurant', restaurantSchema)

export { restaurantModel }
