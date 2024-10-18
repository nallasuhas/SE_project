const {postRegister, register, postLogin, login, logout} = require('../controllers/AuthControllers')
const express = require('express');
const { index, updateCart } = require('../controllers/CartControllers');
const {indexHome} = require('../controllers/HomeControllers.js')
const router = express.Router()

const {admin, auth, guest} = require('../controllers/Middlewares.js');
const { indexOrder, showOrders } = require('../controllers/customers/OrderControllers.js');

router.get('/', indexHome )

router.get('/register',guest, register)
router.post('/register', postRegister)
router.get('/login', guest, login)
router.post('/login', postLogin)
router.post('/logout', logout )

router.get('/cart', index)
router.post('/update-cart', updateCart )

// router.post('/orders', auth, store)
router.get('/customer/orders', auth, indexOrder)
router.get('/customer/orders/:id', auth, showOrders)



module.exports = router