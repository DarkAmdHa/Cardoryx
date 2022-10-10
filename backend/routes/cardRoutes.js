const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

const {
  getCards,
  addCard,
  getCard,
  deleteCard,
  updateCard,
} = require('../controllers/cardController')

router.route('/').get(protect, getCards).post(protect, addCard)

router
  .route('/:id')
  .get(protect, getCard)
  .delete(protect, deleteCard)
  .put(protect, updateCard)
module.exports = router
