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

restaurantSchema.index({ 'location': '2dsphere' })
const restaurantModel = mongoose.model('Restaurant', restaurantSchema)

export { restaurantModel }
