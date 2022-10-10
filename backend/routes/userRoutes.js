const express = require('express')
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
router.post('/usersList', getAllUsers)

router.post('/', registerUser)

router.post('/login', loginUser)

module.exports = router
