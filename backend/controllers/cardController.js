const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Card = require('../models/cardModel')

// @desc    Get user cards
//@route    GET /cards/
//@access   Private
const getCards = asyncHandler(async (req, res) => {
  //Get user using id and the jwt
  const user = User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Utilisateur non trouvé')
  }

  const cards = await Card.find({ user: req.user.id })
  res.status(200).json(cards)
})

// @desc    Get user card
//@route    GET /cards/:id
//@access   Private
const getCard = asyncHandler(async (req, res) => {
  //Get user using id and the jwt
  const user = User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Utilisateur non trouvé')
  }

  const card = await Card.findById(req.params.id)
  if (!card) {
    res.status(404)
    throw new Error('Carte non trouvé')
  }

  if (card.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('Pas autorisé')
  }

  res.status(200).json(card)
})

// @desc    Add new card
//@route    POST /cards/
//@access   Private
const addCard = asyncHandler(async (req, res) => {
  const { name, companyName, email, teleponeNumber } = req.body
  if (!email) {
    res.status(400)
    throw new Error('Veuillez ajouter un e-mail')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Utilisateur non trouvé')
  }

  const card = await Card.create({
    name,
    companyName,
    email,
    teleponeNumber,
    user: req.user.id,
  })

  res.status(201).json(card)
})

// @desc    Delete card
//@route    DELETE /cards/:id
//@access   Private
const deleteCard = asyncHandler(async (req, res) => {
  //Get user using id and the jwt
  const user = User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Utilisateur non trouvé')
  }

  const card = await Card.findById(req.params.id)
  if (!card) {
    res.status(404)
    throw new Error('Carte non trouvé')
  }

  if (card.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('Pas autorisé')
  }

  await card.remove()

  res.status(200).json({ success: true })
})

// @desc    Update card
//@route    UPDATE /cards/:id
//@access   Private
const updateCard = asyncHandler(async (req, res) => {
  //Get user using id and the jwt
  const user = User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Utilisateur non trouvé')
  }

  const card = await Card.findById(req.params.id)
  if (!card) {
    res.status(404)
    throw new Error('Carte non trouvé')
  }

  if (card.user.toString() != req.user.id) {
    res.status(401)
    throw new Error('Pas autorisé')
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCard)
})

module.exports = {
  getCards,
  getCard,
  addCard,
  deleteCard,
  updateCard,
}
