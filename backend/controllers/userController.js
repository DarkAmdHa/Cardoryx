const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc    Register a new user
//@route    /users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, name, email, companyName, telephoneNumber } =
    req.body
  //Validation
  if (!username || !password || !name) {
    res.status(400)
    throw new Error('Veuillez inclure tous les champs')
  }

  // Find if user already exists
  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error("Nom d'utilisateur existe deja")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await User.create({
    username,
    password: hashedPassword,
    name,
    email,
    companyName,
    telephoneNumber,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Données utilisateur invalides')
  }
})

// @desc    Login a user
//@route    /users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  //Check User and password's match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get All users (Using POST)
//@route    /usersList
//@access   Private
const getAllUsers = asyncHandler(async (req, res) => {
  const { username, token } = req.body

  const user = await User.findOne({ username })

  //Check User and password's match
  if (user && jwt.verify(token, process.env.JWT_SECRET)) {
    let userMap = {}

    User.find({}, (err, users) => {
      res.status(200).json(users)
    })
  } else {
    res.status(401)
    throw new Error("Informations d'identification invalides")
  }
})

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
}
