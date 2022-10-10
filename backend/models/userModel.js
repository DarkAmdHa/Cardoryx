const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Veuillez fournir  un nom d'utilisateur"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Veuillez fournir un mot de passe'],
    },
    name: {
      type: String,
      required: [true, 'Veuillez fournir votre nom'],
    },
    companyName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
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

module.exports = mongoose.model('User', userSchema)
