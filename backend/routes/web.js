const {postRegister, register, postLogin, login, logout} = require('../controllers/AuthControllers')
const express = require('express');
const { index, updateCart } = require('../controllers/CartControllers');
const router = express.Router()



// router.get('/', )

router.get('/register', register)
router.post('/register', postRegister)
router.get('/login', login)
router.post('/login', postLogin)
router.post('/logout', logout )

router.get('/cart', index)
router.post('/update-cart', updateCart )

module.exports = router