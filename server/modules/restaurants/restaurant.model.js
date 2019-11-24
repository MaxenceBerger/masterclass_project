import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const restaurantSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    secret: { type: String }
  },
  { timestamps: true }
)

restaurantSchema.pre('save', async function (next) {
  let restaurant = this
  // only hash the password if it has been modified (or is new)
  if (!restaurant.isModified('password')) return next()

  let hashedpassword = await bcrypt.hash(restaurant.password, 10)

  restaurant.password = hashedpassword

  next()
})

restaurantSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const restaurantModel = mongoose.model('restaurant', restaurantSchema)

export { restaurantModel }
