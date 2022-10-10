const mongoose = require('mongoose')

const cardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    name: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
    },
    telephoneNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Card', cardSchema)
